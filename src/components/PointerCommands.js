import React from 'react';
import PropTypes from 'prop-types';

export default class PointerCommands extends React.Component {
  constructor(props) {
    super(props);

    this.stop = (e)=> {
      e.stopPropagation();
      e.preventDefault();
    };
  }

  render() {
    const propsToEvents = new Map([
      [this.props.down, [
        `onTouchStart`,
        `onMouseDown`
      ]],

      [this.props.move, [
        `onTouchMove`,
        `onMouseMove`
      ]],

      [this.props.up, [
        `onTouchEnd`,
        `onMouseUp`,
        `onTouchCancel`
      ]]
    ]);

    const pointerEvents = {};

    propsToEvents.forEach((eventNames, prop)=> {
      if(!prop) {
        return;
      }

      for(const name of eventNames) {
        pointerEvents[name] = (e)=> {
          this.stop(e);
          prop(e);
        };
      }
    });

    return React.cloneElement(
      this.props.children,
      this.props.apply ? { ...pointerEvents } : { pointerEvents }
    );
  }
}

PointerCommands.propTypes = {
  apply: PropTypes.bool,
  down: PropTypes.func,
  move: PropTypes.func,
  up: PropTypes.func,
  children: PropTypes.element.isRequired
};

PointerCommands.defaultProps = {
  apply: false,
  down: null,
  move: null,
  up: null
};
