import React from "react";
import PropTypes from "prop-types";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

const QuickMenuItem = props => (
  <MenuItem onClick={props.onClick}>
    <ListItemIcon>{props.icon}</ListItemIcon>
    <ListItemText>{props.label}</ListItemText>
  </MenuItem>
);

QuickMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
};

export default QuickMenuItem;
