import React from 'react';
import PropTypes from 'prop-types';

import { set, get, keys } from 'idb-keyval';

import { styleSettingsManageData } from './SettingsStyles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StorageIcon from '@material-ui/icons/Storage';
import DeleteIcon from '@material-ui/icons/Delete';
import ExportIcon from '@material-ui/icons/Save';
import ImportIcon from '@material-ui/icons/Publish';

import { persistValues } from '../../cores/GameBoy-Online/js/index';

class SettingsKeyBindings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      games: [],
      currentlyDeleting: {}
    };

    this.toggleManager = ()=> {
      this.setState({ open: !this.state.open });
    };

    const cleanUpRemoveUI = (id, type)=> {
      const games = this.state.games.filter((game)=>
        (type === `game` && game.rom !== id)
        || type !== `game`
      ).map((game)=> {
        const rGame = { ...game };

        if(rGame.name === id) {
          const saves = { ...rGame.saves };
          delete saves[type];

          rGame.saves = saves;
        }

        return rGame;
      });

      this.setState({ games });
    };

    this.deleteGame = (rom)=> ()=> {
      cleanUpRemoveUI(rom, `game`);

      props.deleteGame(rom);
      this.dismissDelete();
    };

    this.deleteSRAM = (name)=> ()=> {
      cleanUpRemoveUI(name, `sram`);

      props.deleteSRAM(name);
      this.dismissDelete();
    };

    this.deleteSaveState = (name, slot)=> ()=> {
      cleanUpRemoveUI(name, slot);

      props.deleteSaveState(name, slot);
      this.dismissDelete();
    };

    this.requestPermission = ({ action, type, name })=> ()=> {
      this.setState({
        currentlyDeleting: {
          action,
          type,
          name
        }
      });
    };

    this.dismissDelete = ()=> {
      this.setState({ currentlyDeleting: {} });
    };

    this.confirmationMessages = new Map([
      [`sram`, `in-game save data for`],
      [`main`, `save state data for`],
      [`auto`, `autosave data for`]
    ]);

    this.importSRAM = (key)=> (e)=> {
      const [file] = e.target.files;

      if(!file) {
        return false;
      }

      const reader = new FileReader();

      reader.onload = (re)=> {
        const sram = new Uint8Array(re.target.result);

        persistValues[key] = sram;

        set(key, sram);
      };

      reader.onerror = (err)=> {
        console.error(`Could not upload SRAM file!`, err);
      };

      reader.readAsArrayBuffer(file);
    };
  }

  componentDidMount() {
    const games = [...this.props.library];

    for(const game of games) {
      game.saves = {};
    }

    keys().then((dataKeys)=> {
      for(const key of dataKeys) {
        for(const game of games) {
          if(!(`name` in game)) {
            continue;
          }

          if(key === `SRAM_${game.name}`) {
            get(key).then((sram)=> {
              const blob = new Blob(sram);
              const url = URL.createObjectURL(blob);
              game.saves.sram = {
                key,
                url
              };

              this.setState({ games });
            });
            game.saves.sram = key;
          } else if(key === `FREEZE_${game.name}_main`) {
            game.saves.main = key;
          } else if(key === `FREEZE_${game.name}_auto`) {
            game.saves.auto = key;
          }
        }
      }

      this.setState({ games });
    });
  }

  render() {
    const { classes } = this.props;

    const isOpen = this.state.open && Boolean(this.props.library.length);

    const Expand = isOpen ? ExpandLess : ExpandMore;

    const { currentlyDeleting } = this.state;

    return (
      <React.Fragment>
        <ListItem className={classes.settingsItem} button onClick={this.toggleManager}>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="Data Management" className={classes.itemText} />
          <Expand className={classes.expand} />
        </ListItem>
        <Collapse
          className={classes.collapsibleList}
          in={isOpen}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {this.state.games.map((game)=> {
              const { title, md5, rom, name, saves } = game;

              return (
                <React.Fragment key={md5}>
                  <ListItem className={classes.nested} dense button onClick={this.requestPermission({
                    action: this.deleteGame(rom),
                    type: `game`,
                    name: title
                  })}>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={title}
                      classes={{
                        root: classes.itemRoot,
                        primary: classes.itemPrimary
                      }}
                    />
                  </ListItem>
                  {name && Object.entries(saves).map(([key, saveValue])=> {
                    let label = ``,
                        action = null;

                    if(key === `sram`) {
                      label = `SRAM`;
                      action = this.deleteSRAM(name);
                    } else if(key === `main`) {
                      label = `Save State`;
                      action = this.deleteSaveState(name, `main`);
                    } else if(key === `auto`) {
                      label = `Autosave`;
                      action = this.deleteSaveState(name, `auto`);
                    }

                    return (
                      <ListItem
                        key={key}
                        className={`${classes.nested} ${classes.save}`}
                        dense
                        button
                        onClick={this.requestPermission({
                          action,
                          type: key,
                          name: title
                        })}
                      >
                        <ListItemIcon>
                          <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={label}
                          classes={{
                            root: classes.itemRoot,
                            primary: classes.itemPrimary
                          }}
                        />
                        {key === `sram` && <ListItemSecondaryAction>
                          <IconButton aria-label="Import">
                            <label htmlFor={`library-add-game-${name}`} className={classes.addGameLabel}>
                              <ImportIcon />
                            </label>
                            <input
                              id={`library-add-game-${name}`}
                              type="file"
                              style={{ display: `none` }}
                              onChange={this.importSRAM(saveValue.key)}
                            />
                          </IconButton>
                          <IconButton aria-label="Export">
                            <a
                              className={classes.secondaryAction}
                              href={saveValue.url}
                              download={`${title.split(`.`)[0]}.srm`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExportIcon />
                            </a>
                          </IconButton>
                        </ListItemSecondaryAction>}
                      </ListItem>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </List>
        </Collapse>

        <Dialog
          maxWidth="xs"
          aria-labelledby="settings-manage-data-confirm-title"
          open={Boolean(currentlyDeleting.name)}
        >
          <DialogTitle id="settings-manage-data-confirm-title">
            {`Really delete?`}
          </DialogTitle>
          <DialogContent className={classes.confirmBody}>
            {
              `You are about to delete ${
                this.confirmationMessages.get(currentlyDeleting.type) || ``
              } "${currentlyDeleting.name}"`
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.dismissDelete} color="primary">
              {`Cancel`}
            </Button>
            <Button
              onClick={currentlyDeleting.action}
              variant="contained"
              className={classes.confirmButton}
            >
              {`Delete`}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

SettingsKeyBindings.propTypes = {
  classes: PropTypes.object.isRequired,
  library: PropTypes.array,
  deleteGame: PropTypes.func.isRequired,
  deleteSRAM: PropTypes.func.isRequired,
  deleteSaveState: PropTypes.func.isRequired
};

export default styleSettingsManageData(SettingsKeyBindings);
