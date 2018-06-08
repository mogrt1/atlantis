import React from 'react';
import PropTypes from 'prop-types';

export default class KeyCommands extends React.Component {
  componentDidMount() {
    document.addEventListener(`keydown`, (e)=> {
      if(!(e.key in this.props.children)) {
        return false;
      }

      this.props.children[e.key].down(e);
    });
  }

  render() {
    return null;
  }
}

KeyCommands.propTypes = { children: PropTypes.object.isRequired };
