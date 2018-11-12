import React from "react";
import PropTypes from "prop-types";

const Loader = props => {
  const { uri } = props;

  const load = () => {
    fetch(uri)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error(`Network response was not ok.`);
      })
      .then(blob => {
        const reader = new FileReader();

        reader.onloadend = () => {
          props.setCurrentROM(reader.result);
        };

        reader.readAsArrayBuffer(blob);
      })
      .catch(error => {
        console.error(
          `There has been a problem with your fetch operation: `,
          error.message
        );
      });
  };

  React.useEffect(
    () => {
      load();
    },
    [uri]
  );

  return null;
};

Loader.propTypes = {
  uri: PropTypes.string.isRequired,
  setCurrentROM: PropTypes.func.isRequired
};

export default Loader;
