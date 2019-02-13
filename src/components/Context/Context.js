// This component tracks and modifies application data.
// It uses the React Context API.

import React from "react";
import PropTypes from "prop-types";

import { get } from "idb-keyval";

const appContext = React.createContext();
const { Provider, Consumer } = appContext;

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

const Context = ({ children, initialState, restoreCoreData }) => {
  [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    restoreCoreData().then(() => {
      // Hydrate settings.
      get(`settings`).then((savedSettings = {}) => {
        actions.setSavedSettings(savedSettings);
      });
      // Reattempt thumb downloads that could not be completed while offline.
      get(`games`).then((library = []) => {
        this.actions.retryThumbs(library);
      });
      // Load last-played game.
      get(`currentROM`).then(currentROM => {
        if (currentROM) {
          this.actions.setCurrentROM(currentROM, `autoLoad`);
        }
      });
    });
  });

  return <Provider value={state}>{children}</Provider>;
};

Context.propTypes = {
  children: PropTypes.element.isRequired,
  restoreCoreData: PropTypes.func.isRequired
};

export default Context;

export { Consumer, appContext, action };
