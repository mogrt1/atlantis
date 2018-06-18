import React from 'react';
import PropTypes from 'prop-types';

export default class KeyCommands extends React.Component {
  constructor(props) {
    super(props);

    const eventDelegate = (eventType)=> (e)=> {
      if(!(e.key in props.children) || !(eventType in props.children[e.key])) {
        return false;
      }

      e.preventDefault();

      props.children[e.key][eventType](e);
    };

    this.eventDelegateDown = eventDelegate(`down`);
    this.eventDelegateUp = eventDelegate(`up`);
  }

  componentDidMount() {
    document.addEventListener(`keydown`, this.eventDelegateDown);
    document.addEventListener(`keyup`, this.eventDelegateUp);
  }

  componentWillUnmount() {
    document.removeEventListener(`keydown`, this.eventDelegateDown);
    document.removeEventListener(`keyup`, this.eventDelegateUp);
  }

  render() {
    return null;
  }
}

KeyCommands.propTypes = { children: PropTypes.object.isRequired };
