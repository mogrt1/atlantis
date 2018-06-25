import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button/Button';

export default class TurboToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.events = {
      down: ()=> {
        props.toggleTurbo();
      }
    };
  }

  render() {
    return (
      <Button
        className={this.props.className}
        pointerCommands={this.events}
      >
        {this.props.children}
      </Button>
    );
  }
}

TurboToggleButton.propTypes = {
  toggleTurbo: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};
