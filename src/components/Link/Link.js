import React from "react";
import PropTypes from "prop-types";
import { shouldUpdate } from "recompose";

import { styleLink } from "./LinkStyles";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link as LinkIcon } from "@material-ui/icons";

const Link = props => (
  <ListItem
    button
    className={`${props.classes.link} ${
      props.error ? props.classes.error : ``
    }`}
    component="a"
    href={props.href}
    rel="noopener noreferrer"
    target="_blank"
  >
    <ListItemIcon>
      <LinkIcon />
    </ListItemIcon>
    <ListItemText classes={{ root: props.classes.textRoot }}>
      {props.children}
    </ListItemText>
  </ListItem>
);

Link.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  error: PropTypes.bool
};

Link.defaultProps = { error: false };

export default shouldUpdate(() => false)(styleLink(Link));
