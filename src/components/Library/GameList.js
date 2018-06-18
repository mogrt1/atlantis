import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  libraryList as styleLibraryList,
  libraryWidth,
  libraryCols
} from './LibraryStyles';

import GridList from '@material-ui/core/GridList';

import Game from './Game';

const { thumbs, ...db } = {
  "thumbs": `https://raw.githubusercontent.com/libretro-thumbnails/Nintendo_-_Game_Boy/395661835ddf684fd60d6e5cfcd4cb50bf6848f8/Named_Boxarts/%s.png`,
  "74B8D0C410C9579AB69B3550B2134DF6": `Higashio Osamu Kanshuu Pro Yakyuu Stadium '92 (Japan)`,
  "EB41C29D9526E5F24F590D16F7BD33B8": `High Stakes (USA)`,
  "FB4133F25FA0B9EEA75F2EC69B786FE2D20D537E": `Hiryuu no Ken Gaiden (Japan)`,
  "F1631E0A97FD60A285FEBA1B2FC9082BCA3BE829": `Hit the Ice - VHL - The Official Video Hockey League (USA, Europe)`,
  "6B9CCDC2B6611C87DD5425EBCF95185C": `Hitori de Dekirumon! - Cooking Densetsu (Japan)`,
  "A09CA996D31AC59D76A7C156D38C02ED": `Hoi Hoi - Game Boy Ban (Japan)`,
  "4F8E8D2D079A0E3B76A67411D919297808F3849B": `Hokuto no Ken - Seizetsu Juuban Shoubu (Japan)`,
  "D4792ED1687D50CF4C77AFCAB05A24BC": `Home Alone (Japan)`,
  "A3142C83F391EDA6F445226F2D49BD8A384BE411": `Home Alone (USA, Europe)`,
  "853E6F96BCBA40BC4CFA72898B02AEBC3F9D9498": `Home Alone 2 - Lost In New York (USA, Europe)`,
  "5AC712759DE3B6D6F7760272D62E2F53": `Hon Shougi (Japan) (SGB Enhanced)`,
  "D8DD3E1BAA95D8BB0A4E6B4E97EA64B8EC34331A": `Hong Kong (Japan)`
};

class GameList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rate: 2 };

    this.handleChange = (e)=> {
      this.setState({ [e.target.name]: e.target.value });
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <GridList cellHeight={libraryWidth / libraryCols} cols={libraryCols} className={classes.libraryList}>
        {Object.entries(db).map(([md5, title])=> (
          <Game
            key={md5}
            thumb={thumbs.replace(`%s`, encodeURIComponent(title))}
            title={title}
          />
        ))}
      </GridList>
    );
  }
}

GameList.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles({ libraryList: styleLibraryList })(GameList);
