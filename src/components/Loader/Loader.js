import React from "react";
import PropTypes from "prop-types";

import * as libraryActions from "../actions/libraryActions";

const Loader = ({ uri }) => {
  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch(uri);

        if (!response.ok) {
          throw new Error(`Network response was not ok.`);
        }

        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = () => {
          libraryActions.setCurrentROM(reader.result);
        };
        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error(
          `There has been a problem with your fetch operation: `,
          error.message
        );
      }
    })();
  }, []);

  return null;
};

Loader.propTypes = {
  uri: PropTypes.string.isRequired
};

export default React.memo(
  Loader,
  (prevProps, nextProps) => prevProps.uri === nextProps.uri
);
