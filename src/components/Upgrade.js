import React from 'react';

import { get, set } from 'idb-keyval';

export default class Upgrade extends React.Component {
  constructor(props) {
    super(props);

    // An older system kept all ROMs in a single IDB entry.
    // This upgrade looks for the data signature of the old system
    // and converts it to the new system, which is one ROM buffer per IDB entry,
    // keyed by its MD5 hash.
    this.md5GameRefs = async ()=> {
      const games = await get(`games`);

      let upgraded = false;

      for(const game of games) {
        if(game.rom) {
          set(game.md5, game.rom);

          delete game.rom;

          upgraded = true;
        }
      }

      if(upgraded) {
        set(`games`, games);
      }
    };
  }

  componentDidMount() {
    this.md5GameRefs();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}
