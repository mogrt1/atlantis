import React from 'react';
import PropTypes from 'prop-types';

export default class KeyCommands extends React.Component {
  constructor(props) {
    super(props);

    this.eventDelegate = (e)=> {
      if(!(e.key in props.children)) {
        return false;
      }

      props.children[e.key].down(e);
    };
  }

  componentDidMount() {
    document.addEventListener(`keydown`, this.eventDelegate);
  }

  componentWillUnmount() {
    document.removeEventListener(`keydown`, this.eventDelegate);
  }

  render() {
    return null;
  }
}

KeyCommands.propTypes = { children: PropTypes.object.isRequired };
