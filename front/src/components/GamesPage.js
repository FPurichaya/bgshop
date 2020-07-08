import React from 'react';
import PropTypes from 'prop-types';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import GameList from './GameList';
import GameForm from './GameForm';
import api from '../api';
import AdminRoute from './AdminRoute';

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

class GamesPage extends React.Component {
  state = {
    gameDetails: [],
    loading: true,
  };

  componentDidMount() {
    api.games
      .fetchAll()
      .then((games) =>
        this.setState({ gameDetails: this.sortGames(games), loading: false })
      );
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

  saveGame = (game) =>
    (game._id ? this.updateGame(game) : this.addGame(game)).then(() =>
      this.props.history.push('/games')
    );

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
    api.games.delete(game).then(() =>
      this.setState({
        gameDetails: this.state.gameDetails.filter(
          (item) => item._id !== game._id
        ),
      })
    );

  render() {
    const numberOfColumns =
      this.props.location.pathname === '/games' ? 'sixteen' : 'ten';

    return (
      <div className="ui container">
        <div className="ui stackable grid">
          <AdminRoute
            user={this.props.user}
            path="/games/new"
            render={() => (
              <div className="six wide column">
                <GameForm
                  publishers={publishers}
                  submit={this.saveGame}
                  game={{}}
                />
              </div>
            )}
          />

          <AdminRoute
            user={this.props.user}
            path="/games/edit/:_id"
            render={(props) => (
              <div className="six wide column">
                <GameForm
                  publishers={publishers}
                  submit={this.saveGame}
                  game={
                    _find(this.state.gameDetails, {
                      _id: props.match.params._id,
                    }) || {}
                  }
                />
              </div>
            )}
          />

          <div className={`${numberOfColumns} wide column`}>
            {this.state.loading ? (
              <div className="ui icon message">
                <i className="notched circle loading icon"></i>
                <div className="content">
                  <div className="header">Wait a second!!</div>
                  <p>Games collection is loading...</p>
                </div>
              </div>
            ) : (
              <GameList
                games={this.state.gameDetails}
                toggleFeatured={this.toggleFeatured}
                deleteGame={this.deleteGame}
                user={this.props.user}
              />
            )}
          </div>
        </div>

        <br />
      </div>
    );
  }
}

GamesPage.defaultProps = {
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default GamesPage;
