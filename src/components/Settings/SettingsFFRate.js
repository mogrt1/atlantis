import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsFFRate } from './SettingsStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FastForwardIcon from '@material-ui/icons/FastForward';

class SettingsFFRate extends React.Component {
  constructor(props) {
    super(props);

    this.rateLevels = 9;
    this.firstRate = 2;

    this.state = { rate: props.rate || this.firstRate };

    this.changeRate = (e)=> {
      this.setState({ rate: e.target.value });

      props.updateSetting(e.target.value);
    };
  }

  render() {
    const { classes } = this.props;

    return (
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
                value={index + this.firstRate}
              >
                {`${index + this.firstRate}x`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
    );
  }
}

SettingsFFRate.propTypes = {
  classes: PropTypes.object.isRequired,
  updateSetting: PropTypes.func.isRequired,
  rate: PropTypes.number
};

export default styleSettingsFFRate(SettingsFFRate);
