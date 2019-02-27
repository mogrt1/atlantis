// This component tracks and modifies application data.
// It uses the React Context API.

import React from "react";
import PropTypes from "prop-types";

const appContext = React.createContext();
const { Provider } = appContext;

let state;
let dispatch;

const actions = {};

const reducer = (state, action) => {
  if (!actions[action.type]) {
    console.error(`Invalid Action:`, action);
    return;
  }

  const newState = { ...state, ...action };
  delete newState.type;

  return newState;
};

const action = (type, callback) => {
  actions[type] = callback;

  const blitspatch = (payload = {}) => {
    dispatch({
      type,
      ...payload
    });
  };

  return (...args) => callback(state, blitspatch, ...args);
};

const Context = ({ children, initialState = {} }) => {
  [state, dispatch] = React.useReducer(reducer, initialState);

  return <Provider value={state}>{children}</Provider>;
};

Context.propTypes = {
  initialState: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default Context;

export { appContext, action };
