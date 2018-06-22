// This component tracks and modifies application data.
// It uses the React Context API.

import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import Spark from 'spark-md5';
import { set, get } from 'idb-keyval';

import { thumbs, games } from '../db/gameboy.js';

import { pause, run } from '../cores/GameBoy-Online/js/index';

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
  ffRate: 3,
  ffToggle: true,
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
    'settings-kb-ff': `\``
  }
};

export default class Context extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsOpen: false,
      libraryOpen: false,
      library: [],
      playingROM: ``,
      settings: JSON.parse(JSON.stringify(defaultSettings))
    };

    this.actions = {
      setCanvas: (canvas)=> {
        this.setState({ canvas });
      },

      runGame: (playingROM)=> {
        this.setState({
          playingROM,
          libraryOpen: false
        });

        run();
      },

      setCurrentROM: (currentROM)=> {
        this.setState({ currentROM });
      },

      toggleDrawer: (drawerName)=> ()=> {
        this.setState(
          { [`${drawerName}Open`]: !this.state[`${drawerName}Open`] },

          ()=> {
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
              set(`games`, JSON.stringify(this.state.library));
            }
          );
        });
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
            set(`settings`, JSON.stringify(this.state.settings));
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
              set(`games`, JSON.stringify(this.state.library));
            }
          );
        });
      }
    };
  }

  componentDidMount() {
    // Hydrate settings.
    get(`settings`).then((settingsJSON = JSON.stringify(defaultSettings))=> {
      const settings = JSON.parse(settingsJSON);

      this.setState({
        settings: {
          ...this.state.settings,
          ...settings
        }
      });
    });

    // Reattempt thumb downloads that could not be completed while offline.
    get(`games`).then((gamesJSON = `[]`)=> {
      const library = JSON.parse(gamesJSON);

      this.actions.retryThumbs(library);
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

Context.propTypes = { children: PropTypes.element };

export { Consumer };
