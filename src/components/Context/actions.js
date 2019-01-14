import React from "react";

import initialState from "./initialState";
import reducer from "./reducer";

export default () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return [
    state,
    {
      setSavedSettings: savedSettings => {
        dispatch({ type: `SET_SAVED_SETTINGS`, savedSettings });
      }
    }
  ];
};
