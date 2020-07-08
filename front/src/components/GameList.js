import React from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard';
import Message from './Message';

const GameList = ({ games, toggleFeatured, deleteGame, user }) => (
  <div className="ui four cards">
    {games.length === 0 ? (
      <div className="ui icon message">
        <Message header="Header" content="Message" type="default" />
      </div>
    ) : (
      games.map((item) => (
        <GameCard
          game={item}
          key={item._id}
          toggleFeatured={toggleFeatured}
          deleteGame={deleteGame}
          user={user}
        />
      ))
    )}
  </div>
);

GameList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

GameList.defaultProps = {
  games: [],
};

export default GameList;
