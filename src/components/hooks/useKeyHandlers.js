import React from "react";

const useKeyHandlers = (inputs, condition) => {
  React.useEffect(() => {
    if (condition !== undefined && !condition) {
      return () => {};
    }

    const eventDelegate = eventType => e => {
      if (e.repeat || !(e.key in inputs) || !(eventType in inputs[e.key])) {
        return false;
      }

      e.preventDefault();

      inputs[e.key][eventType](e);
    };

    const eventDelegateDown = eventDelegate(`down`);
    const eventDelegateUp = eventDelegate(`up`);

    document.addEventListener(`keydown`, eventDelegateDown);
    document.addEventListener(`keyup`, eventDelegateUp);

    return () => {
      document.removeEventListener(`keydown`, eventDelegateDown);
      document.removeEventListener(`keyup`, eventDelegateUp);
    };
  });

  return null;
};

export default useKeyHandlers;
