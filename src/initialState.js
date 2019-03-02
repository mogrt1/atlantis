const defaultSettings = {
  firstUse: true,
  mute: false,
  haptics: `vibrate` in window.navigator,
  ffRate: 3,
  ffToggle: true,
  enableRewind: true,
  showOverlay: true,
  keyBindings: {
    "settings-kb-b": `z`,
    "settings-kb-a": `x`,
    "settings-kb-b-turbo": `a`,
    "settings-kb-a-turbo": `s`,
    "settings-kb-start": `Enter`,
    "settings-kb-select": `Shift`,
    "settings-kb-up": `ArrowUp`,
    "settings-kb-down": `ArrowDown`,
    "settings-kb-left": `ArrowLeft`,
    "settings-kb-right": `ArrowRight`,
    "settings-kb-rw": `Backspace`,
    "settings-kb-ff": `\``,
    "settings-kb-save-state": `1`,
    "settings-kb-load-state": `3`,
    "settings-kb-abss": `0`,
    "settings-kb-reset": `r`
  }
};

export default {
  hydrated: false,
  canvas: null,
  appStoreOpen: false,
  settingsOpen: false,
  libraryOpen: false,
  library: [],
  currentROM: null,
  settings: JSON.parse(JSON.stringify(defaultSettings)),
  turbo: false,
  message: ``,
  rewindQueue: [],
  audioNeedsConfirmation: false
};
