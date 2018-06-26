import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

import KeyCommands from '../KeyCommands';

import { GameBoyJoyPadEvent as gameBoyJoyPadEvent } from '../../cores/GameBoy-Online/js/index';

class ABStartSelect extends React.Component {
  constructor(props) {
    super(props);

    const buttonCodes = {
      START: 7,
      SELECT: 6,
      A: 4,
      B: 5
    };

    this.press = ()=> {
      for(const [, code] of Object.entries(buttonCodes)) {
        gameBoyJoyPadEvent(code, `pressed`);
      }

      const PRESSTIME = 500;
      setTimeout(()=> {
        for(const [, code] of Object.entries(buttonCodes)) {
          gameBoyJoyPadEvent(code);
        }
      }, PRESSTIME);

      props.close();
    };
  }

  render() {
    return (
      <React.Fragment>
        <MenuItem onClick={this.press}>
          <ListItemIcon>
            <VideogameAssetIcon />
          </ListItemIcon>
          <ListItemText>
            {`A+B+Start+Select`}
          </ListItemText>
        </MenuItem>

        <KeyCommands>
          {{ [this.props.kb]: { up: this.press } }}
        </KeyCommands>
      </React.Fragment>
    );
  }
}

ABStartSelect.propTypes = {
  close: PropTypes.func.isRequired,
  kb: PropTypes.string.isRequired
};

export default ABStartSelect;
