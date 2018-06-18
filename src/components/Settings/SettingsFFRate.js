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

    this.state = { rate: 2 };

    this.handleChange = (e)=> {
      this.setState({ [e.target.name]: e.target.value });
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
            onChange={this.handleChange}
            inputProps={{
              name: `settings-ff-rate`,
              id: `settings-ff-rate`
            }}
          >
            <MenuItem value={2}>2x</MenuItem>
            <MenuItem value={3}>3x</MenuItem>
            <MenuItem value={4}>4x</MenuItem>
            <MenuItem value={5}>5x</MenuItem>
            <MenuItem value={6}>6x</MenuItem>
            <MenuItem value={7}>7x</MenuItem>
            <MenuItem value={8}>8x</MenuItem>
            <MenuItem value={9}>9x</MenuItem>
            <MenuItem value={10}>10x</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    );
  }
}

SettingsFFRate.propTypes = { classes: PropTypes.object.isRequired };

export default styleSettingsFFRate(SettingsFFRate);
