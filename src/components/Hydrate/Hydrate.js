import React from "react";
import { get, set, del, keys } from "idb-keyval";

import * as hydrateActions from "../actions/hydrateActions";
import { persistValues, saveValue } from "../../cores/GameBoy-Online/index";

const notCoreKeys = new Set([`games`, `settings`, `currentROM`]);

const hydrateCoreData = async function() {
  const dataKeys = await keys();

  const valuesTx = [];

  for (const key of dataKeys) {
    valuesTx.push(get(key));
  }

  const values = await Promise.all(valuesTx);

  for (const [index, key] of dataKeys.entries()) {
    if (notCoreKeys.has(key)) {
      continue;
    }

    persistValues[key] = values[index];
  }

  return true;
};

saveValue.subscribe((key, value) => {
  if (value === null) {
    del(key);
  } else {
    set(key, value);
  }
});

const Hydrate = props => {
  React.useEffect(() => {
    hydrateCoreData().then(() => {
      hydrateActions.hydrateSavedSettings();
    });
  }, []);

  return null;
};

export default Hydrate;
