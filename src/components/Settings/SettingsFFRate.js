import React from 'react';
import PropTypes from 'prop-types';

import { styleSettingsFFRate } from './SettingsStyles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
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
      this.closeMenu();

      props.updateSetting(e.target.value);
    };

    this.openMenu = (e)=> {
      this.setState({ anchorEl: e.currentTarget });
    };

    this.closeMenu = ()=> {
      this.setState({ anchorEl: null });
    };
  }

  render() {
    const { classes } = this.props;

    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <ListItem
          button
          onClick={this.openMenu}
          className={classes.settingsItem}
          aria-owns={anchorEl ? `settings-ff-rate` : null}
          aria-haspopup="true"
        >
          <ListItemIcon>
            <FastForwardIcon />
          </ListItemIcon>
          <ListItemText className={classes.itemText}>
            {`Fast-Forward Rate`}
          </ListItemText>

          <span className={classes.value}>
            {`${this.state.rate}x`}
          </span>
        </ListItem>

        <Menu
          id="settings-ff-rate"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: `top`,
            horizontal: `right`
          }}
          transformOrigin={{
            vertical: `top`,
            horizontal: `right`
          }}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          {Array(this.rateLevels).fill(`0`).map((el, index)=> (
            <MenuItem
              key={el + index}
              value={index + this.firstRate}
              onClick={this.changeRate}
            >
              {`${index + this.firstRate}x`}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}

SettingsFFRate.propTypes = {
  classes: PropTypes.object.isRequired,
  updateSetting: PropTypes.func.isRequired,
  rate: PropTypes.number
};

export default styleSettingsFFRate(SettingsFFRate);
