import React from "react";
import PropTypes from "prop-types";
import "fake-indexeddb/auto";
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom/extend-expect";

import Context from "./components/Context/Context";
import initialState from "./initialState";

export const Providers = ({ children }) => (
  <div id="root">
    <Context initialState={initialState}>{children}</Context>
  </div>
);

Providers.propTypes = {
  children: PropTypes.node
};
