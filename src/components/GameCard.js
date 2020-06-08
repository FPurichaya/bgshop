import React from 'react';
import Proptypes from 'prop-types';
import Featured from './Featured';
import Price from './Price';

const GameCard = ({ game }) => (
  <div className="ui card">
    <div className="image">
      <span className="ui green ribbon label">
        $<Price prices={game.price} />
      </span>
      <Featured featured={game.featured} />
      <img src={game.thumbnail} alt="Game Cover" />
    </div>
    <div className="content">
      <a href="http://duckduckgo.com" className="header">
        {game.name}
      </a>
      <div className="meta">
        <i className="icon users" /> {game.players}&nbsp;
        <i className="icon wait" /> {game.duration} min.
      </div>
    </div>
  </div>
);

GameCard.propTypes = {
  game: Proptypes.shape({
    name: Proptypes.string.isRequired,
    thumbnail: Proptypes.string.isRequired,
    players: Proptypes.string.isRequired,
    price: Proptypes.number.isRequired,
    duration: Proptypes.number.isRequired,
    featured: Proptypes.bool.isRequired,
  }).isRequired,
};

export default GameCard;
