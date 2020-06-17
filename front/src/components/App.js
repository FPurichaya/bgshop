import React from 'react';
import _orderBy from 'lodash/orderBy';
import GameList from './GameList';
import GameForm from './GameForm';
import TopNavigation from './TopNavigation';
import api from '../api';

const publishers = [
  {
    _id: 1,
    name: 'Days of Wonder',
  },
  {
    _id: 2,
    name: 'Rio Grand Games',
  },
];

class App extends React.Component {
  state = {
    gameDetails: [],
    showGameForm: false,
  };

  componentDidMount() {
    api.games
      .fetchAll()
      .then((games) => this.setState({ gameDetails: this.sortGames(games) }));
  }

  sortGames(gameDetails) {
    return _orderBy(gameDetails, ['featured', 'name'], ['desc', 'asc']);
  }

  toggleFeatured = (gameId) => {
    //  const newGames = this.state.gameDetails.map((game) => {
    //    if (game._id === gameId) return { ...game, featured: !game.featured };
    //    return game;
    //  });
    //  this.setState({ gameDetails: this.sortGames(newGames) });
    this.setState({
      gameDetails: this.sortGames(
        this.state.gameDetails.map((game) =>
          gameId === game._id ? { ...game, featured: !game.featured } : game
        )
      ),
    });
  };

  showGameForm = () => this.setState({ showGameForm: true });
  hideGameForm = () => this.setState({ showGameForm: false });

  render() {
    const numberOfColumns = this.state.showGameForm ? 'ten' : 'sixteen';

    return (
      <div className="ui container">
        <TopNavigation showGameForm={this.showGameForm} />

        <div className="ui stackable grid">
          {this.state.showGameForm && (
            <div className="six wide column">
              <GameForm publishers={publishers} cancel={this.hideGameForm} />
            </div>
          )}
          <div className={`${numberOfColumns} wide column`}>
            <GameList
              games={this.state.gameDetails}
              toggleFeatured={this.toggleFeatured}
            />
          </div>
        </div>

        <br />
      </div>
    );
  }
}

export default App;
