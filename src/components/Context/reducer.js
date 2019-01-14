export default (state, action) => {
  switch (action.type) {
    case `SET_SAVED_SETTINGS`: {
      return {
        ...state,
        hydrated: true,
        ...action.savedSettings
      };
    }

    default: {
      console.error(`Invalid Action:`, action);
      return;
    }
  }
};
