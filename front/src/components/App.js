import React from 'react';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import GameList from './GameList';
import GameForm from './GameForm';
import TopNavigation from './TopNavigation';
import api from '../api';

const publishers = [
  {
    _id: '1',
    name: 'Days of Wonder',
  },
  {
    _id: '2',
    name: 'Rio Grand Games',
  },
];

class App extends React.Component {
  state = {
    gameDetails: [],
    showGameForm: false,
    selectedGame: {},
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
    const game = _find(this.state.gameDetails, { _id: gameId });
    return this.updateGame({
      ...game,
      featured: !game.featured,
    });
  };

  showGameForm = () => this.setState({ showGameForm: true, selectedGame: {} });
  hideGameForm = () => this.setState({ showGameForm: false, selectedGame: {} });

  selectGameForEditing = (game) =>
    this.setState({ selectedGame: game, showGameForm: true });

  saveGame = (game) => (game._id ? this.updateGame(game) : this.addGame(game));

  addGame = (gameData) =>
    api.games.create(gameData).then((game) =>
      this.setState({
        gameDetails: this.sortGames([...this.state.gameDetails, game]),
        showGameForm: false,
      })
    );

  updateGame = (gameData) =>
    api.games.update(gameData).then((game) =>
      this.setState({
        gameDetails: this.sortGames(
          this.state.gameDetails.map((item) =>
            item._id === game._id ? game : item
          )
        ),
        showGameForm: false,
      })
    );

  deleteGame = (game) =>
    this.setState({
      gameDetails: this.state.gameDetails.filter(
        (item) => item._id !== game._id
      ),
    });

  render() {
    const numberOfColumns = this.state.showGameForm ? 'ten' : 'sixteen';

    return (
      <div className="ui container">
        <TopNavigation showGameForm={this.showGameForm} />

        <div className="ui stackable grid">
          {this.state.showGameForm && (
            <div className="six wide column">
              <GameForm
                publishers={publishers}
                cancel={this.hideGameForm}
                submit={this.saveGame}
                game={this.state.selectedGame}
              />
            </div>
          )}
          <div className={`${numberOfColumns} wide column`}>
            <GameList
              games={this.state.gameDetails}
              toggleFeatured={this.toggleFeatured}
              editGame={this.selectGameForEditing}
              deleteGame={this.deleteGame}
            />
          </div>
        </div>

        <br />
      </div>
    );
  }
}

export default App;
