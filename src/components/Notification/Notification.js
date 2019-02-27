import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

import { useNotificationStyles } from "./NotificationStyles";

const Notification = ({
  children,
  open = false,
  autoHide = null,
  primaryAction = null,
  secondaryAction = null,
  secondaryLabel = ``,
  onClose = null
}) => {
  const handleClick = primaryAction,
    handleButton = secondaryAction,
    handleClose = onClose;

  const classes = useNotificationStyles();

  return (
    <Snackbar
      action={
        secondaryLabel ? (
          <Button
            className={classes.button}
            onClick={handleButton}
            size="small"
          >
            {secondaryLabel}
          </Button>
        ) : null
      }
      anchorOrigin={{
        vertical: `top`,
        horizontal: `center`
      }}
      autoHideDuration={autoHide}
      className={classes.snackbar}
      ContentProps={{
        className: classes.content,
        "aria-describedby": `notification-content`
      }}
      message={<div id="notification-content">{children}</div>}
      onClick={handleClick}
      onClose={handleClose}
      open={open}
    />
  );
};

Notification.propTypes = {
  open: PropTypes.bool,
  autoHide: PropTypes.number,
  children: PropTypes.node.isRequired,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  secondaryLabel: PropTypes.string,
  onClose: PropTypes.func
};

export default Notification;
