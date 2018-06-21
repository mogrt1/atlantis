import React from 'react';
import PropTypes from 'prop-types';

import { start } from '../cores/GameBoy-Online/js/index';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.load = ()=> {
      const { rom, uri } = this.props;

      if(rom) {
        start(this.props.canvas, rom);
        this.props.setCurrentROM(rom);

        return;
      }

      fetch(uri).then((response)=> {
        if(response.ok) {
          return response.blob();
        }
        throw new Error(`Network response was not ok.`);
      }).then((blob)=> {
        const reader = new FileReader();

        reader.onloadend = ()=> {
          start(this.props.canvas, reader.result);
          this.props.setCurrentROM(reader.result);
        };

        reader.readAsBinaryString(blob);
      }).catch((error)=> {
        console.error(`There has been a problem with your fetch operation: `, error.message);
      });
    };
  }

  componentDidMount() {
    this.load();
  }

  shouldComponentUpdate(nextProps) {
    if(
      (nextProps.rom && nextProps.rom === this.props.rom)
      || (nextProps.uri && nextProps.uri === this.props.uri)
    ) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    this.load();
  }

  render() {
    return null;
  }
}


Loader.propTypes = {
  rom: PropTypes.string,
  uri: PropTypes.string,
  canvas: PropTypes.instanceOf(HTMLCanvasElement).isRequired,
  setCurrentROM: PropTypes.func.isRequired
};
