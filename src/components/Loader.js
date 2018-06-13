import React from 'react';
import PropTypes from 'prop-types';

import { start } from '../cores/GameBoy-Online/js/index';

export default class Loader extends React.Component {
  componentDidMount() {
    fetch(this.props.uri).then((response)=> {
      if(response.ok) {
        return response.blob();
      }
      throw new Error(`Network response was not ok.`);
    }).then((blob)=> {
      const reader = new FileReader();

      reader.onloadend = ()=> {
        start(this.props.canvas, reader.result);
      };

      reader.readAsBinaryString(blob);
    }).catch((error)=> {
      console.error(`There has been a problem with your fetch operation: `, error.message);
    });
  }

  render() {
    return null;
  }
}

Loader.propTypes = {
  uri: PropTypes.string.isRequired,
  canvas: PropTypes.element.isRequired
};
