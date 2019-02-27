import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FastForwardIcon from "@material-ui/icons/FastForward";

import { useSettingsFFRateStyles } from "./SettingsStyles";

const rateLevels = 9;
const firstRate = 2;

const SettingsFFRate = ({ updateSetting, rate = null }) => {
  const [currRate, setRate] = React.useState(rate || firstRate);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useSettingsFFRateStyles();

  const handleChangeRate = e => {
    setRate(e.target.value);
    handleCloseMenu();

    updateSetting(e.target.value);
  };

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem
        aria-haspopup="true"
        aria-owns={anchorEl ? `settings-ff-rate` : null}
        button
        className={classes.settingsItem}
        onClick={handleOpenMenu}
      >
        <ListItemIcon>
          <FastForwardIcon />
        </ListItemIcon>
        <ListItemText className={classes.itemText}>
          {`Fast-Forward Rate`}
        </ListItemText>

        <span className={classes.value}>{`${currRate}x`}</span>
      </ListItem>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: `top`,
          horizontal: `right`
        }}
        id="settings-ff-rate"
        onClose={handleCloseMenu}
        open={Boolean(anchorEl)}
        transformOrigin={{
          vertical: `top`,
          horizontal: `right`
        }}
      >
        {Array(rateLevels)
          .fill(`0`)
          .map((el, index) => (
            <MenuItem
              key={String(el + index)}
              onClick={handleChangeRate}
              value={index + firstRate}
            >
              {`${index + firstRate}x`}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

SettingsFFRate.propTypes = {
  updateSetting: PropTypes.func.isRequired,
  rate: PropTypes.number
};

export default SettingsFFRate;
