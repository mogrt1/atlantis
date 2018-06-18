import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsFFRate } from './SettingsStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FastForwardIcon from '@material-ui/icons/FastForward';

class SettingsFFRate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 2,
      toggle: true
    };

    this.rateLevels = 9;
    this.startRate = 2;

    this.changeRate = (e)=> {
      this.setState({ rate: e.target.value });
    };

    this.toggleToggle = ()=> {
      this.setState({ toggle: !this.state.toggle });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <ListItem>
          <ListItemIcon>
            <FastForwardIcon />
          </ListItemIcon>
          <FormControl className={classes.select}>
            <InputLabel htmlFor="settings-ff-rate">Fast-Forward Rate</InputLabel>
            <Select
              value={this.state.rate}
              onChange={this.changeRate}
              inputProps={{
                name: `settings-ff-rate`,
                id: `settings-ff-rate`
              }}
            >
              {Array(this.rateLevels).fill(`0`).map((el, index)=> (
                <MenuItem
                  key={el + index}
                  value={index + this.startRate}
                >
                  {`${index + this.startRate}x`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>

        <ListItem button onClick={this.toggleToggle}>
          <ListItemIcon>
            <FastForwardIcon />
          </ListItemIcon>
          <ListItemText className={classes.itemText}>
            {`FF Toggle`}
          </ListItemText>
          <Switch checked={this.state.toggle} classes={{
            root: classes.toggleSwitch,
            checked: classes.toggleSwitchChecked
          }} />
        </ListItem>
      </React.Fragment>
    );
  }
}

SettingsFFRate.propTypes = { classes: PropTypes.object.isRequired };

export default styleSettingsFFRate(SettingsFFRate);
