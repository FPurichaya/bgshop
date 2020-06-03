import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import GameCard from './components/GameCard';

const gameDetails = [
  {
    name: 'Quadropolis',
    thumbnail:
      'https://cf.geekdo-images.com/opengraph/img/tthn7L9-fC_GaXJHfA20VdTrFts=/fit-in/1200x630/pic2840020.jpg',
    price: '32.99',
    players: '2-4',
    duration: '60',
  },
  {
    name: 'Azul',
    thumbnail:
      'https://cf.geekdo-images.com/imagepage/img/mswTFqJsQ_omcKa_y1yNfFMJP6M=/fit-in/900x600/filters:no_upscale()/pic3718275.jpg',
    price: '35.99',
    players: '2-4',
    duration: '30-45',
  },
  {
    name: 'UNO',
    thumbnail:
      'https://www.elitereaders.com/wp-content/uploads/2019/07/uno-card-game-rules-featured.jpg',
    price: '28.99',
    players: '2-4',
    duration: '60',
  },
];

render(<GameCard game={gameDetails[1]} />, document.getElementById('root'));
