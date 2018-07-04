import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import { styleLink } from './LinkStyles';

import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';

const Link = (props)=> (
  <ListItem
    button
    component="a"
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${props.classes.link} ${props.error ? props.classes.error : ``}`}
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
  classes: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  error: PropTypes.bool
};

export default pure(styleLink(Link));
