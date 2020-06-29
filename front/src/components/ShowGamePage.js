import React from 'react';
import api from '../api';
import GamesDetails from './GamesDetails';

class ShowGamePage extends React.Component {
  state = {
    game: {},
    loading: true,
  };

  componentDidMount() {
    api.games
      .fetchById(this.props.match.params._id)
      .then((game) => this.setState({ game, loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <GamesDetails game={this.state.game} />
        )}
      </div>
    );
  }
}

export default ShowGamePage;
