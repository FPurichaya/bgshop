import React from 'react';
import PropTypes from 'prop-types';

const ProductDetails = ({ product }) => (
  <div>
    <h1 className="ui center aligned dividing header">{product.name}</h1>

    <div className="ui stackable grid">
      <div className="six wide column">
        <div className="ui fluid image">
          <img src={product.thumbnail} alt="Product Cover" />
        </div>
      </div>

      <div className="ten wide column">
        <p>{product.description}</p>

        <table className="ui table">
          <tbody>
            <tr>
              <td>Number of Players:</td>
              <td>{product.players}</td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>{product.duration}</td>
            </tr>
          </tbody>
        </table>

        <p className="ui green huge label">{product.price}</p>
      </div>
    </div>
  </div>
);

ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    players: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductDetails;
