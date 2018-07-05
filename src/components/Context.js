// This component tracks and modifies application data.
// It uses the React Context API.

import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import Spark from 'spark-md5';
import { set, get, del, keys } from 'idb-keyval';

import { thumbs, games } from '../db/gameboy.js';

import {
  gameboy,
  settings,
  start,
  pause,
  run,
  stop,
  saveState,
  openState,
  GameBoyJoyPadEvent as gameBoyJoyPadEvent,
  GameBoyEmulatorInitialized as gameBoyEmulatorInitialized,
  XAudioJSWebAudioContextHandle as audioContext,
  persistValues
} from '../cores/GameBoy-Online/js/index';

const { Provider, Consumer } = createContext();

const getDataUri = (url)=> new Promise((resolve)=> {
  fetch(url).then((response)=> {
    if(response.ok) {
      return response.blob();
    }
    throw new Error(JSON.stringify(response));
  }).then((blob)=> {
    const reader = new FileReader();

    reader.onloadend = ()=> {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  }).catch((error)=> {
    console.warn(`Error getting data URI for ${url}:`, error);

    resolve(false);
  });
});

const getThumbUri = async (title)=> {
  const processUri = (uri)=> {
    if(!uri && !navigator.onLine) {
      return `reattempt`;
    } else if(!uri) {
      return false;
    }

    return uri;
  };

  const thumbUri = processUri(
    await getDataUri(thumbs.dmg.replace(`%s`, encodeURIComponent(title)))
  );

  if(typeof thumbUri === `string`) {
    return thumbUri;
  }

  return getDataUri(thumbs.cgb.replace(`%s`, encodeURIComponent(title)));
};

const thumbIsUri = (thumb)=> thumb !== false && thumb !== `reattempt`;

export const defaultSettings = {
  firstUse: true,
  mute: false,
  haptics: true,
  ffRate: 3,
  ffToggle: true,
  showOverlay: true,
  keyBindings: {
    'settings-kb-b': `z`,
    'settings-kb-a': `x`,
    'settings-kb-b-turbo': `a`,
    'settings-kb-a-turbo': `s`,
    'settings-kb-start': `Enter`,
    'settings-kb-select': `Shift`,
    'settings-kb-up': `ArrowUp`,
    'settings-kb-down': `ArrowDown`,
    'settings-kb-left': `ArrowLeft`,
    'settings-kb-right': `ArrowRight`,
    'settings-kb-rw': `Backspace`,
    'settings-kb-ff': `\``,
    'settings-kb-save-state': `1`,
    'settings-kb-load-state': `3`,
    'settings-kb-abss': `0`,
    'settings-kb-reset': `r`
  }
};

const SOUND = 0;

export default class Context extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hydrated: false,
      canvas: null,
      settingsOpen: false,
      libraryOpen: false,
      library: [],
      currentROM: ``,
      settings: JSON.parse(JSON.stringify(defaultSettings)),
      turbo: false,
      message: ``,
      rewindQueue: [],
      audioNeedsConfirmation: false
    };

    this.actions = {
      firstUseComplete: ()=> {
        this.actions.updateSetting(`firstUse`)(false);
        this.setState({ libraryOpen: true });
      },

      setCanvas: (canvas)=> {
        this.setState({ canvas });
      },

      setCurrentROM: (currentROM)=> {
        this.setState(
          {
            currentROM,
            libraryOpen: false,
            rewindQueue: []
          },

          ()=> {
            settings[SOUND] = !this.state.settings.mute;
            start(this.state.canvas.current, this.state.currentROM);

            this.actions.enableAudio();

            const library = [...this.state.library];

            for(const game of library) {
              if(game.rom === currentROM) {
                if(!(`name` in game)) {
                  game.name = gameboy.name;

                  set(`games`, library);

                  this.setState({ library });
                }

                break;
              }
            }

            // Load autosave.
            openState(`auto`, this.state.canvas.current);

            set(`currentROM`, this.state.currentROM);
          }
        );
      },

      enableAudio: ()=> {
        if(audioContext && audioContext.state === `suspended`) {
          audioContext.resume();

          const CHECK_AUDIO_WAIT = 1000;

          setTimeout(()=> {
            if(audioContext.state === `suspended`) {
              this.setState({ audioNeedsConfirmation: true });
            } else {
              this.setState({ audioNeedsConfirmation: false });
            }
          }, CHECK_AUDIO_WAIT);
        } else {
          this.setState({ audioNeedsConfirmation: false });
        }
      },

      toggleDrawer: (drawerName)=> ()=> {
        this.setState(
          { [`${drawerName}Open`]: !this.state[`${drawerName}Open`] },

          ()=> {
            if(!gameBoyEmulatorInitialized()) {
              return;
            }

            if(this.state[`${drawerName}Open`]) {
              pause();
            } else {
              run();
            }
          }
        );
      },

      addToLibrary: (ROM, callback)=> {
        if(!ROM.length) {
          return;
        }

        const roms = Array.isArray(ROM) ? ROM : [ROM];

        for(const rom of roms) {
          const { md5 } = rom;

          for(const { libMd5 } of this.state.library) {
            if(md5 === libMd5) {
              return;
            }
          }
        }

        this.setState({
          library: [
            ...this.state.library,
            ...roms
          ]
        }, callback);
      },

      uploadGame: (e)=> {
        const getROM = (file)=> new Promise((resolve, reject)=> {
          const reader = new FileReader();

          const buffer = new Spark.ArrayBuffer();
          let rom = ``;

          reader.onload = (re)=> {
            if(typeof re.target.result === `object`) {
              buffer.append(re.target.result);

              reader.readAsBinaryString(file);
            } else {
              rom = re.target.result;
            }

            if(buffer._length && rom.length) {
              const md5 = buffer.end().toUpperCase();

              const romData = {
                title: games[md5] || file.name,
                md5,
                rom
              };

              getThumbUri(romData.title).then((uri)=> {
                romData.thumb = uri;

                resolve(romData);
              });
            }
          };

          reader.onerror = (err)=> {
            reject(err);
          };

          reader.readAsArrayBuffer(file);
        });

        const roms = [];

        for(const file of e.target.files) {
          roms.push(getROM(file));
        }

        Promise.all(roms).then((results)=> {
          this.actions.addToLibrary(
            results,
            ()=> {
              set(`games`, this.state.library);
            }
          );
        });
      },

      deleteGame: (rom)=> {
        let deletedGame = null;

        const library = this.state.library.filter((game)=> {
          if(game.rom === rom) {
            deletedGame = game;
            return false;
          }

          return true;
        });

        let { currentROM } = this.state;

        if(currentROM === rom) {
          currentROM = ``;
          stop();
        }

        this.setState(
          {
            library,
            currentROM
          },

          ()=> {
            if(this.state.library.length) {
              set(`games`, this.state.library);
            } else {
              del(`games`);
            }

            if(!currentROM) {
              del(`currentROM`);
            }
          }
        );

        this.actions.deleteSRAM(deletedGame.name);
        this.actions.deleteSaveState(deletedGame.name, `main`);
        this.actions.deleteSaveState(deletedGame.name, `auto`);
      },

      deleteSRAM: async (name)=> {
        const dataKeys = await keys();

        for(const key of dataKeys) {
          if(key === `SRAM_${name}`) {
            del(key);
            delete persistValues[key];
          }
        }
      },

      deleteSaveState: async (name, slot)=> {
        const dataKeys = await keys();

        for(const key of dataKeys) {
          if(key === `FREEZE_${name}_${slot}`) {
            del(key);
            delete persistValues[key];
          }
        }
      },

      updateSetting: (key)=> (value)=> {
        this.setState(
          {
            settings: {
              ...this.state.settings,
              [key]: value
            }
          },

          ()=> {
            set(`settings`, this.state.settings);
          }
        );
      },

      retryThumbs: (library, force)=> {
        // If we aren't forcing an update and don't need to do one, then don't.
        if(!force && !library.some((game)=> game.thumb === `reattempt`)) {
          return false;
        }

        // Create retries from given library.
        const retries = library.map((game)=> new Promise((resolve)=> {
          // If we're forcing an update or game is marked for it.
          if(force || game.thumb === `reattempt`) {
            getThumbUri(game.title).then((thumb)=> {
              // If game's thumb is valid, but the network's isn't, don't update.
              if(
                thumbIsUri(game.thumb)
                && !thumbIsUri(thumb)
              ) {
                resolve(game);
                return;
              }

              // If the game's thumb isn't valid or the network has a valid
              // replacement, update the thumb.
              if(
                !thumbIsUri(game.thumb)
                || (thumbIsUri(game.thumb) && thumbIsUri(thumb))
              ) {
                game.thumb = thumb;
              }

              resolve(game);
            });
          } else {
            resolve(game);
          }
        }));

        // Fetch all applicable thumbs, then replace library in context and IDB.
        Promise.all(retries).then((updatedLibrary)=> {
          this.setState(
            { library: updatedLibrary },

            ()=> {
              set(`games`, this.state.library);
            }
          );
        });
      },

      toggleTurbo: ()=> {
        this.setState({ turbo: !this.state.turbo });
      },

      saveState: ()=> {
        saveState(`main`);
        this.actions.showMessage(`Saved state.`);
      },

      loadState: ()=> {
        openState(`main`, this.state.canvas.current);
        this.actions.showMessage(`Loaded state.`);
      },

      abss: ()=> {
        const buttonCodes = {
          START: 7,
          SELECT: 6,
          A: 4,
          B: 5
        };

        for(const [, code] of Object.entries(buttonCodes)) {
          gameBoyJoyPadEvent(code, `pressed`);
        }

        const PRESSTIME = 500;
        setTimeout(()=> {
          for(const [, code] of Object.entries(buttonCodes)) {
            gameBoyJoyPadEvent(code);
          }
        }, PRESSTIME);
      },

      reset: ()=> {
        start(this.state.canvas.current, this.state.currentROM);
      },

      showMessage: (message)=> {
        this.setState({ message });
      },

      hideMessage: ()=> {
        this.setState({ message: `` });
      }
    };
  }

  componentDidMount() {
    this.props.restoreCoreData().then(()=> {
      // Hydrate settings.
      get(`settings`).then((savedSettings = JSON.parse(JSON.stringify(defaultSettings)))=> {
        this.setState({
          hydrated: true,
          settings: {
            ...this.state.settings,
            ...savedSettings
          }
        });
      });

      // Reattempt thumb downloads that could not be completed while offline.
      get(`games`).then((library = [])=> {
        this.actions.retryThumbs(library);
      });

      // Load last-played game.
      get(`currentROM`).then((currentROM)=> {
        if(currentROM) {
          this.actions.setCurrentROM(currentROM, `autoLoad`);
        }
      });
    });
  }

  render() {
    return (
      <Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

Context.propTypes = {
  children: PropTypes.element.isRequired,
  restoreCoreData: PropTypes.func.isRequired
};

export { Consumer };
