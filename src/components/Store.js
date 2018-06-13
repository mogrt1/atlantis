import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = createContext();

export default class Store extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.actions = {
      setCanvas: (canvas)=> {
        this.setState({ canvas });
      }
    };
  }

  render() {
    return (
      <Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

Store.propTypes = { children: PropTypes.element };

export { Consumer };
