import React from 'react';
import Proptypes from 'prop-types';
import GameCard from './GameCard';

const GameList = ({ games }) => (
  <div className="ui four cards">
    {games.map((item) => (
      <GameCard game={item} key={item._id} />
    ))}
  </div>
);

GameList.propTypes = {
  games: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default GameList;
