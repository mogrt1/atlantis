import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link as LinkIcon } from "@material-ui/icons";

import { useLinkStyles } from "./LinkStyles";

const Link = props => {
  const classes = useLinkStyles();

  return (
    <ListItem
      button
      className={`${classes.link} ${props.error ? classes.error : ``}`}
      component="a"
      href={props.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText classes={{ root: classes.textRoot }}>
        {props.children}
      </ListItemText>
    </ListItem>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  error: PropTypes.bool
};

Link.defaultProps = { error: false };

export default React.memo(Link, () => true);
