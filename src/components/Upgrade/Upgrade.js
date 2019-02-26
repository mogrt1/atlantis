import React from "react";
import { get, set } from "idb-keyval";

// An older system kept all ROMs in a single IDB entry.
// This upgrade looks for the data signature of the old system
// and converts it to the new system, which is one ROM buffer per IDB entry,
// keyed by its MD5 hash.
const md5GameRefs = async () => {
  const games = await get(`games`);

  if (!games) {
    return;
  }

  let upgraded = false;

  for (const game of games) {
    if (game.rom) {
      set(game.md5, game.rom);

      delete game.rom;

      upgraded = true;
    }
  }

  if (upgraded) {
    set(`games`, games);
  }
};

const Upgrade = () => {
  React.useEffect(() => {
    md5GameRefs();
  }, []);

  return null;
};

export default Upgrade;
