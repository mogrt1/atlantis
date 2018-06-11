import React from 'react';
import PropTypes from 'prop-types';

export default class PointerCommands extends React.Component {
  constructor(props) {
    super(props);

    const stop = (e)=> {
      e.stopPropagation();
      e.preventDefault();
    };

    const propsToEvents = new Map([
      [props.down, [
        `onPointerDown`,
        `onTouchStart`,
        `onMouseDown`
      ]],

      [props.move, [
        `onPointerMove`,
        `onTouchMove`,
        `onMouseMove`
      ]],

      [props.up, [
        `onPointerUp`,
        `onTouchEnd`,
        `onMouseUp`,
        `onPointerCancel`,
        `onTouchCancel`
      ]]
    ]);

    this.events = {};

    propsToEvents.forEach(([prop, eventNames])=> {
      for(const name of eventNames) {
        this.events[name] = (e)=> {
          if(!prop) {
            return false;
          }

          stop(e);
          prop(e);
        };
      }
    });
  }

  render() {
    return React.cloneElement(this.props.children, { ...this.events });
  }
}

PointerCommands.propTypes = {
  down: PropTypes.func,
  move: PropTypes.func,
  up: PropTypes.func,
  children: PropTypes.element.isRequired
};
