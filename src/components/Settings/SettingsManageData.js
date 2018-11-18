import React from "react";
import PropTypes from "prop-types";

import { set, get, keys } from "idb-keyval";

import { useSettingsManageDataStyles } from "./SettingsStyles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StorageIcon from "@material-ui/icons/Storage";
import DeleteIcon from "@material-ui/icons/Delete";
import ExportIcon from "@material-ui/icons/Save";
import ImportIcon from "@material-ui/icons/Publish";

import { Consumer } from "../Context/Context";

import {
  gameboy,
  persistValues,
  pause
} from "../../cores/GameBoy-Online/index";

class SettingsManageData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      games: [],
      currentlyDeleting: {}
    };

    this.handleToggleManager = () => {
      this.setState(prevState => ({ open: !prevState.open }));
    };

    const cleanUpRemoveUI = (id, type) => {
      this.setState(prevState => ({
        games: prevState.games
          .filter(
            game => (type === `game` && game.rom !== id) || type !== `game`
          )
          .map(game => {
            const rGame = { ...game };

            if (rGame.name === id) {
              const saves = { ...rGame.saves };
              delete saves[type];

              rGame.saves = saves;
            }

            return rGame;
          })
      }));
    };

    this.deleteGame = rom => () => {
      cleanUpRemoveUI(rom, `game`);

      props.deleteGame(rom);
      this.handleDismissDelete();
    };

    this.deleteSRAM = name => () => {
      cleanUpRemoveUI(name, `sram`);

      props.deleteSRAM(name);
      this.handleDismissDelete();
    };

    this.deleteSaveState = (name, slot) => () => {
      cleanUpRemoveUI(name, slot);

      props.deleteSaveState(name, slot);
      this.handleDismissDelete();
    };

    this.handleRequestPermission = ({ action, type, name }) => () => {
      this.setState({
        currentlyDeleting: {
          action,
          type,
          name
        }
      });
    };

    this.handleDismissDelete = () => {
      this.setState({ currentlyDeleting: {} });
    };

    this.confirmationMessages = new Map([
      [`sram`, `in-game save data for`],
      [`main`, `save state data for`],
      [`auto`, `autosave data for`]
    ]);

    const modifySaveState = async (key, index, value) => {
      const state = await get(key);

      if (!state) {
        return false;
      }

      state[index] = value;

      set(key, state);
    };

    this.importSRAM = (name, key, reset) => e => {
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
  }

  componentDidMount() {
    const games = [...this.props.library];

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

              this.setState({ games });
            });
            game.saves.sram = key;
          } else if (key === `FREEZE_${game.name}_main`) {
            game.saves.main = key;
          } else if (key === `FREEZE_${game.name}_auto`) {
            game.saves.auto = key;
          }
        }
      }

      this.setState({ games });
    });
  }

  render() {
    const isOpen = this.state.open && Boolean(this.props.library.length);

    const Expand = isOpen ? ExpandLess : ExpandMore;

    const { currentlyDeleting } = this.state;
    const classes = useSettingsManageDataStyles();

    return (
      <Consumer>
        {({ actions }) => (
          <>
            <ListItem
              button
              className={classes.settingsItem}
              onClick={this.handleToggleManager}
            >
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.itemText}
                primary="Data Management"
              />
              <Expand className={classes.expand} />
            </ListItem>
            <Collapse
              className={classes.collapsibleList}
              in={isOpen}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {this.state.games.map(game => {
                  const { title, md5, rom, name, saves } = game;

                  return (
                    <React.Fragment key={md5}>
                      <ListItem
                        button
                        className={classes.nested}
                        dense
                        onClick={this.handleRequestPermission({
                          handleAction: this.deleteGame(rom),
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
                            action = this.deleteSRAM(name);
                          } else if (key === `main`) {
                            label = `Save State`;
                            action = this.deleteSaveState(name, `main`);
                          } else if (key === `auto`) {
                            label = `Autosave`;
                            action = this.deleteSaveState(name, `auto`);
                          }

                          return (
                            <ListItem
                              key={key}
                              button
                              className={`${classes.nested} ${classes.save}`}
                              dense
                              onClick={this.handleRequestPermission({
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
                                      onChange={this.importSRAM(
                                        name,
                                        saveValue.key,
                                        actions.reset
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
                {`You are about to delete ${this.confirmationMessages.get(
                  currentlyDeleting.type
                ) || ``} "${currentlyDeleting.name}"`}
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.handleDismissDelete}>
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
        )}
      </Consumer>
    );
  }
}

SettingsManageData.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object),
  deleteGame: PropTypes.func.isRequired,
  deleteSRAM: PropTypes.func.isRequired,
  deleteSaveState: PropTypes.func.isRequired
};

SettingsManageData.defaultProps = { library: [] };

export default SettingsManageData;
