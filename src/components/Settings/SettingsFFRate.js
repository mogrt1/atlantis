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

    this.handleChangeRate = (e)=> {
      this.setState({ rate: e.target.value });
      this.handleCloseMenu();

      props.updateSetting(e.target.value);
    };

    this.handleOpenMenu = (e)=> {
      this.setState({ anchorEl: e.currentTarget });
    };

    this.handleCloseMenu = ()=> {
      this.setState({ anchorEl: null });
    };
  }

  render() {
    const { classes } = this.props;

    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <ListItem
          aria-haspopup="true"
          aria-owns={anchorEl ? `settings-ff-rate` : null}
          button
          className={classes.settingsItem}
          onClick={this.handleOpenMenu}
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
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: `top`,
            horizontal: `right`
          }}
          id="settings-ff-rate"
          onClose={this.handleCloseMenu}
          open={Boolean(anchorEl)}
          transformOrigin={{
            vertical: `top`,
            horizontal: `right`
          }}
        >
          {Array(this.rateLevels).fill(`0`).map((el, index)=> (
            <MenuItem
              key={String(el + index)}
              onClick={this.handleChangeRate}
              value={index + this.firstRate}
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  updateSetting: PropTypes.func.isRequired,
  rate: PropTypes.number
};

SettingsFFRate.defaultProps = { rate: null };

export default styleSettingsFFRate(SettingsFFRate);
