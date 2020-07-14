import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Featured from './Featured';
import Price from './Price';

class ProductCard extends React.Component {
  state = {
    showConfirmation: false,
  };

  showConfirmation = () => this.setState({ showConfirmation: true });
  hideConfirmation = () => this.setState({ showConfirmation: false });

  render() {
    const { product, toggleFeatured, deleteProduct, user } = this.props;
    const adminActions = (
      <div className="extra content">
        {this.state.showConfirmation ? (
          <div className="ui two buttons">
            {/* eslint-disable-next-line */}
            <a
              className="ui red basic button"
              onClick={() => deleteProduct(product)}
            >
              <i className="ui icon check">YES</i>
            </a>
            {/* eslint-disable-next-line */}
            <a className="ui grey basic button" onClick={this.hideConfirmation}>
              <i className="ui icon close">NO</i>
            </a>
          </div>
        ) : (
          <div className="ui two buttons">
            <Link
              className="ui green basic button"
              to={`/store/edit/${product._id}`}
            >
              <i className="ui icon edit"></i>
            </Link>
            {/* eslint-disable-next-line */}
            <a className="ui red basic button" onClick={this.showConfirmation}>
              <i className="ui icon trash"></i>
            </a>
          </div>
        )}
      </div>
    );
    const addToCart = (
      <div className="extra content">
        {/* eslint-disable-next-line */}
        <a className="ui green basic button">Add to Cart</a>
      </div>
    );

    return (
      <div className="ui card">
        <div className="image">
          <span className="ui green ribbon label">
            $<Price prices={product.price} />
          </span>
          <Featured
            featured={product.featured}
            toggleFeatured={toggleFeatured}
            productId={product._id}
          />
          <img src={product.thumbnail} alt="Product Cover" />
        </div>
        <div className="content">
          <Link to={`/product/${product._id}`} className="header">
            {product.name}
          </Link>
          <div className="meta">
            <i className="icon users" /> {product.players}&nbsp;
            <i className="icon wait" /> {product.duration} min.
          </div>
        </div>

        {user.token && user.role === 'user' && addToCart}
        {user.token && user.role === 'admin' && adminActions}
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    players: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
