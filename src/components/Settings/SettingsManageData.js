import React from 'react';
import PropTypes from 'prop-types';

import { keys } from 'idb-keyval';

import { styleSettingsManageData } from './SettingsStyles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StorageIcon from '@material-ui/icons/Storage';
import DeleteIcon from '@material-ui/icons/Delete';

class SettingsKeyBindings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      games: []
    };

    this.toggleManager = ()=> {
      this.setState({ open: !this.state.open });
    };

    this.deleteGame = (rom)=> ()=> {
      props.deleteGame(rom);
    };

    this.deleteSRAM = (name)=> ()=> {
      props.deleteSRAM(name);
    };

    this.deleteSaveState = (name, slot)=> ()=> {
      props.deleteSaveState(name, slot);
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

          if(key === `B64_SRAM_${game.name}`) {
            game.saves.sram = key;
          } else if(key === `FREEZE_${game.name}_main`) {
            game.saves.state = key;
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
            {this.state.games.map(({ title, md5, rom, name, saves })=> (
              <React.Fragment key={md5}>
                <ListItem className={classes.nested} dense button onClick={this.deleteGame(rom)}>
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
                {name && Object.entries(saves).map(([key])=> {
                  let label = ``,
                      action = null;

                  if(key === `sram`) {
                    label = `SRAM`;
                    action = this.deleteSRAM(name);
                  } else if(key === `state`) {
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
                      onClick={action}
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
                    </ListItem>
                  );
                })}
              </React.Fragment>
            ))}
          </List>
        </Collapse>
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
