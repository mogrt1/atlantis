import React from "react";
import { set, get, keys } from "idb-keyval";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Storage as StorageIcon,
  Delete as DeleteIcon,
  Save as ExportIcon,
  Publish as ImportIcon
} from "@material-ui/icons";

import { appContext } from "../Context/Context";
import * as quickMenuActions from "../actions/quickMenuActions";
import * as settingsActions from "../actions/settingsActions";
import {
  gameboy,
  persistValues,
  pause
} from "../../cores/GameBoy-Online/index";

import { useSettingsManageDataStyles } from "./SettingsStyles";

const SettingsManageData = props => {
  const { library } = React.useContext(appContext);

  const [state, setState] = React.useState({
    open: false,
    games: [],
    currentlyDeleting: {}
  });

  const handleToggleManager = () => {
    setState({ ...state, open: !state.open });
  };

  const cleanUpRemoveUI = (id, type) => {
    setState({
      ...state,
      games: state.games
        .filter(game => (type === `game` && game.rom !== id) || type !== `game`)
        .map(game => {
          const rGame = { ...game };

          if (rGame.name === id) {
            const saves = { ...rGame.saves };
            delete saves[type];

            rGame.saves = saves;
          }

          return rGame;
        })
    });
  };

  const deleteGame = rom => () => {
    cleanUpRemoveUI(rom, `game`);

    settingsActions.deleteGame(rom);
    handleDismissDelete();
  };

  const deleteSRAM = name => () => {
    cleanUpRemoveUI(name, `sram`);

    settingsActions.deleteSRAM(name);
    handleDismissDelete();
  };

  const deleteSaveState = (name, slot) => () => {
    cleanUpRemoveUI(name, slot);

    settingsActions.deleteSaveState(name, slot);
    handleDismissDelete();
  };

  const handleRequestPermission = ({ action, type, name }) => () => {
    setState({
      ...state,
      currentlyDeleting: {
        action,
        type,
        name
      }
    });
  };

  const handleDismissDelete = () => {
    setState({ ...state, currentlyDeleting: {} });
  };

  const confirmationMessages = new Map([
    [`sram`, `in-game save data for`],
    [`main`, `save state data for`],
    [`auto`, `autosave data for`]
  ]);

  const modifySaveState = async (key, index, value) => {
    const saveState = await get(key);

    if (!saveState) {
      return false;
    }

    saveState[index] = value;

    set(key, saveState);
  };

  const importSRAM = (name, key, reset) => e => {
    const [file] = e.target.files;

    if (!file) {
      return false;
    }

    const reader = new FileReader();

    reader.onload = re => {
      const sram = new Uint8Array(re.target.result);

      persistValues[key] = sram;
      set(key, sram);

      if (name === gameboy.name) {
        gameboy.MBCRam = sram;
        reset();
        pause();
      }

      const SRAM_INDEX = 19;

      modifySaveState(`FREEZE_${name}_main`, SRAM_INDEX, sram);
      modifySaveState(`FREEZE_${name}_auto`, SRAM_INDEX, sram);
    };

    reader.onerror = err => {
      console.error(`Could not upload SRAM file!`, err);
    };

    reader.readAsArrayBuffer(file);
  };

  React.useEffect(() => {
    const games = [...library];

    for (const game of games) {
      game.saves = {};
    }

    keys().then(dataKeys => {
      for (const key of dataKeys) {
        for (const game of games) {
          if (!(`name` in game)) {
            continue;
          }

          if (key === `SRAM_${game.name}`) {
            get(key).then(sram => {
              const blob = new Blob(sram);
              const url = URL.createObjectURL(blob);
              game.saves.sram = {
                key,
                url
              };

              setState({ ...state, games });
            });
            game.saves.sram = key;
          } else if (key === `FREEZE_${game.name}_main`) {
            game.saves.main = key;
          } else if (key === `FREEZE_${game.name}_auto`) {
            game.saves.auto = key;
          }
        }
      }

      setState({ ...state, games });
    });
  }, [library, state]);

  const isOpen = state.open && Boolean(library.length);

  const Expand = isOpen ? ExpandLess : ExpandMore;

  const { currentlyDeleting } = state;
  const classes = useSettingsManageDataStyles();

  return (
    <>
      <ListItem
        button
        className={classes.settingsItem}
        onClick={handleToggleManager}
      >
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText className={classes.itemText} primary="Data Management" />
        <Expand className={classes.expand} />
      </ListItem>
      <Collapse
        className={classes.collapsibleList}
        in={isOpen}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {state.games.map(game => {
            const { title, md5, rom, name, saves } = game;

            return (
              <React.Fragment key={md5}>
                <ListItem
                  button
                  className={classes.nested}
                  dense
                  onClick={handleRequestPermission({
                    handleAction: deleteGame(rom),
                    type: `game`,
                    name: title
                  })}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      root: classes.itemRoot,
                      primary: classes.itemPrimary
                    }}
                    primary={title}
                  />
                </ListItem>
                {name &&
                  Object.entries(saves).map(([key, saveValue]) => {
                    let label = ``,
                      action = null;

                    if (key === `sram`) {
                      label = `SRAM`;
                      action = deleteSRAM(name);
                    } else if (key === `main`) {
                      label = `Save State`;
                      action = deleteSaveState(name, `main`);
                    } else if (key === `auto`) {
                      label = `Autosave`;
                      action = deleteSaveState(name, `auto`);
                    }

                    return (
                      <ListItem
                        key={key}
                        button
                        className={`${classes.nested} ${classes.save}`}
                        dense
                        onClick={handleRequestPermission({
                          action,
                          type: key,
                          name: title
                        })}
                      >
                        <ListItemIcon>
                          <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText
                          classes={{
                            root: classes.itemRoot,
                            primary: classes.itemPrimary
                          }}
                          primary={label}
                        />
                        {key === `sram` && (
                          <ListItemSecondaryAction>
                            <IconButton aria-label="Import">
                              <label
                                className={classes.addGameLabel}
                                htmlFor={`library-add-game-${name}`}
                              >
                                <ImportIcon />
                              </label>
                              <input
                                id={`library-add-game-${name}`}
                                onChange={importSRAM(
                                  name,
                                  saveValue.key,
                                  quickMenuActions.reset
                                )}
                                style={{ display: `none` }}
                                type="file"
                              />
                            </IconButton>
                            <IconButton aria-label="Export">
                              <a
                                className={classes.secondaryAction}
                                download={`${title.split(`.`)[0]}.srm`}
                                href={saveValue.url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <ExportIcon />
                              </a>
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                      </ListItem>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </List>
      </Collapse>

      <Dialog
        aria-labelledby="settings-manage-data-confirm-title"
        maxWidth="xs"
        open={Boolean(currentlyDeleting.name)}
      >
        <DialogTitle id="settings-manage-data-confirm-title">
          {`Really delete?`}
        </DialogTitle>
        <DialogContent className={classes.confirmBody}>
          {`You are about to delete ${confirmationMessages.get(
            currentlyDeleting.type
          ) || ``} "${currentlyDeleting.name}"`}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleDismissDelete}>
            {`Cancel`}
          </Button>
          <Button
            className={classes.confirmButton}
            onClick={currentlyDeleting.handleAction}
            variant="contained"
          >
            {`Delete`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SettingsManageData;
