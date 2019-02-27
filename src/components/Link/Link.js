import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link as LinkIcon } from "@material-ui/icons";

import { useLinkStyles } from "./LinkStyles";

const Link = ({ error = false, href, children }) => {
  const classes = useLinkStyles();

  return (
    <ListItem
      button
      className={`${classes.link} ${error ? classes.error : ``}`}
      component="a"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText classes={{ root: classes.textRoot }}>
        {children}
      </ListItemText>
    </ListItem>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  error: PropTypes.bool
};

export default Link;
