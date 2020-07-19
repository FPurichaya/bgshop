import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Message from './Message';

const ProductList = ({ store, toggleFeatured, deleteProduct, user }) => (
  <div className="doubling stackable four cards ui grid container">
    {store.length === 0 ? (
      <div className="ui icon message">
        <Message header="Header" content="Message" type="default" />
      </div>
    ) : (
      store.map((item) => (
        <ProductCard
          product={item}
          key={item._id}
          toggleFeatured={toggleFeatured}
          deleteProduct={deleteProduct}
          user={user}
        />
      ))
    )}
  </div>
);

ProductList.propTypes = {
  store: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

ProductList.defaultProps = {
  store: [],
};

export default ProductList;
