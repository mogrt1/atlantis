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
        `onTouchStart`,
        `onMouseDown`
      ]],

      [props.move, [
        `onTouchMove`,
        `onMouseMove`
      ]],

      [props.up, [
        `onTouchEnd`,
        `onMouseUp`,
        `onTouchCancel`
      ]]
    ]);

    this.pointerEvents = {};

    propsToEvents.forEach((eventNames, prop)=> {
      for(const name of eventNames) {
        this.pointerEvents[name] = (e)=> {
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
    return React.cloneElement(this.props.children, { pointerEvents: this.pointerEvents });
  }
}

PointerCommands.propTypes = {
  down: PropTypes.func,
  move: PropTypes.func,
  up: PropTypes.func,
  children: PropTypes.element.isRequired
};
