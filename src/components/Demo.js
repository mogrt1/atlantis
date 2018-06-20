import React from 'react';

import Loader from './Loader';
import { Consumer } from './Context';

import demo from '../demo.gb';

export default class Demo extends React.Component {
  render() {
    return (
      <Consumer>
        {({ state, actions })=> (
          <React.Fragment>
            {
              state.canvas && state.canvas.current
                && <Loader
                  uri={demo}
                  canvas={state.canvas.current}
                  setCurrentROM={actions.setCurrentROM}
                />
            }
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}
