const stop = e => {
  e.stopPropagation();
  e.preventDefault();
};

const usePointerHandlers = ({ down = null, move = null, up = null } = {}) => {
  const commandsToEvents = new Map([
    [down, [`onTouchStart`, `onMouseDown`]],
    [move, [`onTouchMove`, `onMouseMove`]],
    [up, [`onTouchEnd`, `onMouseUp`, `onTouchCancel`]]
  ]);

  const pointerHandlers = {};

  commandsToEvents.forEach((eventNames, command) => {
    if (!command) {
      return;
    }

    for (const name of eventNames) {
      pointerHandlers[name] = e => {
        stop(e);
        command(e);
      };
    }
  });

  return pointerHandlers;
};

export default usePointerHandlers;
