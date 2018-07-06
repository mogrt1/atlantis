import React from 'react';
import PropTypes from 'prop-types';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.load = ()=> {
      const { uri } = this.props;

      fetch(uri).then((response)=> {
        if(response.ok) {
          return response.blob();
        }
        throw new Error(`Network response was not ok.`);
      }).then((blob)=> {
        const reader = new FileReader();

        reader.onloadend = ()=> {
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
    return nextProps.uri !== this.props.uri;
  }

  componentDidUpdate() {
    this.load();
  }

  render() {
    return null;
  }
}


Loader.propTypes = {
  uri: PropTypes.string,
  setCurrentROM: PropTypes.func.isRequired
};
