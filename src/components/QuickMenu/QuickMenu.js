import React from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

import Button from '../Button/Button';
import SaveState from './SaveState';
import LoadState from './LoadState';
import ABStartSelect from './ABStartSelect';
import Reset from './Reset';

class QuickMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { anchor: null };

    this.events = {
      up: (e)=> {
        this.setState({ anchor: e.currentTarget });
      }
    };

    this.keyEvents = {};

    this.handleClose = ()=> {
      this.setState({ anchor: null });
    };
  }

  render() {
    const { anchor } = this.state;

    return (
      <React.Fragment>
        <Button
          onClick={this.handleClick}
          aria-owns={anchor ? `quick-menu` : null}
          aria-haspopup="true"
          className={this.props.className}
          pointerCommands={this.events}
          keyCommands={this.keyEvents}
        >
          <MenuIcon />
        </Button>

        <Menu
          id="quick-menu"
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={this.handleClose}
        >
          <SaveState close={this.handleClose} />
          <LoadState close={this.handleClose} />
          <ABStartSelect close={this.handleClose} />
          <Reset close={this.handleClose} />
        </Menu>
      </React.Fragment>
    );
  }
}

QuickMenu.propTypes = {
  className: PropTypes.string,
  kb: PropTypes.string.isRequired
};

export default QuickMenu;
