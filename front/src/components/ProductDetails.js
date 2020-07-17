import React from 'react';
import PropTypes from 'prop-types';
import Price from './Price';

const ProductDetails = ({ product }) => (
  <div>
    <h1 className="ui left aligned dividing header">{product.name}</h1>

    <div className="ui stackable grid">
      <div className="six wide column">
        <div className="ui fluid image">
          <img src={product.thumbnail} alt="Product Cover" />
        </div>
      </div>

      <div className="eight wide column">
        <h4>{product.description}</h4>

        <table className="ui table">
          <tbody>
            <tr>
              <td>In stock:</td>
              <td>{product.instock}</td>
            </tr>
          </tbody>
        </table>

        <p className="ui green huge label">
          $<Price prices={product.price} />
        </p>
      </div>
    </div>
  </div>
);

ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    instock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductDetails;
