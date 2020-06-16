import React from 'react';
import _orderBy from 'lodash/orderBy';
import GameList from './GameList';
import GameForm from './GameForm';

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

const gameDetails = [
  {
    _id: 1,
    publishers: 1,
    featured: true,
    name: 'Quadropolis',
    thumbnail:
      'https://cf.geekdo-images.com/opengraph/img/tthn7L9-fC_GaXJHfA20VdTrFts=/fit-in/1200x630/pic2840020.jpg',
    price: 3299,
    players: '2-4',
    duration: 60,
  },
  {
    _id: 2,
    publishers: 1,
    featured: false,
    name: 'Azul',
    thumbnail:
      'https://cf.geekdo-images.com/imagepage/img/mswTFqJsQ_omcKa_y1yNfFMJP6M=/fit-in/900x600/filters:no_upscale()/pic3718275.jpg',
    price: 3599,
    players: '2-4',
    duration: 30 - 45,
  },
  {
    _id: 3,
    publishers: 2,
    featured: false,
    name: 'UNO',
    thumbnail:
      'https://p16-va-default.akamaized.net/img/musically-maliva-obj/1654747055333381~c5_720x720.jpeg',
    price: 2899,
    players: '2-4',
    duration: 60,
  },
  {
    _id: 4,
    publishers: 2,
    featured: false,
    name: 'Jutaria Millionaire',
    thumbnail:
      'https://www.slstoys.com.my/image/hann/image/cache/data/all_product_images/product-1727/ZWHKHSXV1585820249-700x700.jpg',
    price: 2399,
    players: '2-4',
    duration: 60,
  },
];

class App extends React.Component {
  state = {
    gameDetails: [],
  };

  componentDidMount() {
    this.setState({
      gameDetails: this.sortGames(gameDetails),
    });
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

  render() {
    return (
      <div className="ui container">
        <GameForm publishers={publishers} />
        <br />
        <GameList
          games={this.state.gameDetails}
          toggleFeatured={this.toggleFeatured}
        />
      </div>
    );
  }
}

export default App;
