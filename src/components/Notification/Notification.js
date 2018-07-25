import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import { styleNotification } from './NotificationStyles';

const Notification = (props)=> {
  const {
    classes,
    open,
    autoHide,
    children,
    primaryAction: handleClick,
    secondaryAction: handleButton,
    secondaryLabel,
    onClose: handleClose
  } = props;

  return (
    <Snackbar
      action={
        secondaryLabel
          ? <Button
            className={classes.button}
            onClick={handleButton}
            size="small"
          >
            {secondaryLabel}
          </Button>
          : null
      }
      anchorOrigin={{
        vertical: `top`,
        horizontal: `center`
      }}
      autoHideDuration={autoHide}
      className={classes.snackbar}
      ContentProps={{
        className: classes.content,
        'aria-describedby': `notification-content`
      }}
      message={<div id="notification-content">
        {children}
      </div>}
      onClick={handleClick}
      onClose={handleClose}
      open={open}
    />
  );
};

Notification.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool,
  autoHide: PropTypes.number,
  children: PropTypes.node.isRequired,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  secondaryLabel: PropTypes.string,
  onClose: PropTypes.func
};

Notification.defaultProps = {
  open: false,
  autoHide: null,
  primaryAction: null,
  secondaryAction: null,
  secondaryLabel: ``,
  onClose: null
};

export default styleNotification(Notification);
