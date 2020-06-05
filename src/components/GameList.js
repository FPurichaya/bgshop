import React from 'react';
import Proptypes from 'prop-types';
import GameCard from './GameCard';
import Message from './Message';

const GameList = ({ games }) => (
  <div className="ui four cards">
    {games.length === 0 ? (
      <div className="ui icon message">
        <Message header="Header" content="Message" type="default" />
      </div>
    ) : (
      games.map((item) => <GameCard game={item} key={item._id} />)
    )}
  </div>
);

GameList.propTypes = {
  games: Proptypes.arrayOf(Proptypes.object).isRequired,
};

GameList.defaultProps = {
  games: [],
};

export default GameList;
