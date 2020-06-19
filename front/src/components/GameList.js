import React from 'react';
import Proptypes from 'prop-types';
import GameCard from './GameCard';
import Message from './Message';

const GameList = ({ games, toggleFeatured, editGame, deleteGame }) => (
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
          editGame={editGame}
          deleteGame={deleteGame}
        />
      ))
    )}
  </div>
);

GameList.propTypes = {
  games: Proptypes.arrayOf(Proptypes.object).isRequired,
  toggleFeatured: Proptypes.func.isRequired,
  editGame: Proptypes.func.isRequired,
  deleteGame: Proptypes.func.isRequired,
};

GameList.defaultProps = {
  games: [],
};

export default GameList;
