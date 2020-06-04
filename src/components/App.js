import React from 'react';
import GameList from './GameList';

const gameDetails = [
  {
    _id: 1,
    name: 'Quadropolis',
    thumbnail:
      'https://cf.geekdo-images.com/opengraph/img/tthn7L9-fC_GaXJHfA20VdTrFts=/fit-in/1200x630/pic2840020.jpg',
    price: 32.99,
    players: '2-4',
    duration: 60,
  },
  {
    _id: 2,
    name: 'Azul',
    thumbnail:
      'https://cf.geekdo-images.com/imagepage/img/mswTFqJsQ_omcKa_y1yNfFMJP6M=/fit-in/900x600/filters:no_upscale()/pic3718275.jpg',
    price: 35.99,
    players: '2-4',
    duration: 30 - 45,
  },
  {
    _id: 3,
    name: 'UNO',
    thumbnail:
      'https://p16-va-default.akamaized.net/img/musically-maliva-obj/1654747055333381~c5_720x720.jpeg',
    price: 28.99,
    players: '2-4',
    duration: 60,
  },
  {
    _id: 4,
    name: 'Jutaria Millionaire',
    thumbnail:
      'https://www.slstoys.com.my/image/hann/image/cache/data/all_product_images/product-1727/ZWHKHSXV1585820249-700x700.jpg',
    price: 23.99,
    players: '2-4',
    duration: 60,
  },
];

const App = () => (
  <div className="ui container">
    <GameList games={gameDetails} />
  </div>
);

export default App;
