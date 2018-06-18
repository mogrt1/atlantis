import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import Spark from 'spark-md5';

import { games } from '../db/gameboy.js';

const { Provider, Consumer } = createContext();

export default class Store extends React.Component {
  constructor() {
    super();

    this.state = { library: [] };

    this.actions = {
      setCanvas: (canvas)=> {
        this.setState({ canvas });
      },

      uploadGame: (e)=> {
        const getMd5 = (file)=> new Promise((resolve, reject)=> {
          const reader = new FileReader();

          reader.onload = (re)=> {
            const buffer = new Spark.ArrayBuffer();

            buffer.append(re.target.result);
            resolve({
              fileName: file.name,
              hash: buffer.end().toUpperCase()
            });
          };

          reader.onerror = (err)=> {
            reject(err);
          };

          reader.readAsArrayBuffer(file);
        });

        const md5s = [];

        for(const file of e.target.files) {
          md5s.push(getMd5(file));
        }

        Promise.all(md5s).then((result)=> {
          this.setState({
            library: [
              ...this.state.library,
              ...result.map((md5)=> ({
                md5: md5.hash,
                title: games[md5.hash] || md5.fileName
              }))
            ]
          });
        });
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
