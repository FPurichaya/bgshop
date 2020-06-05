import React from 'react';
import Proptypes from 'prop-types';
import GameCard from './GameCard';

const GameList = ({ games }) => (
  <div className="ui four cards">
    {games.length === 0 ? (
      <div className="ui icon message">
        <i className="icon info"></i>
        <div className="content">
          <div className="header">There are no game in your store!</div>
          <p>Please add the game to your store.</p>
        </div>
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
