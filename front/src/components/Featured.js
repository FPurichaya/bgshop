import React from 'react';
import PropTypes from 'prop-types';

const Featured = ({ featured, toggleFeatured, productId }) => (
  <span>
    {featured ? (
      /* eslint-disable-next-line */
      <a
        onClick={() => toggleFeatured(productId)}
        className="ui right yellow corner label"
      >
        <i className="star icon"></i>
      </a>
    ) : (
      /* eslint-disable-next-line */
      <a
        onClick={() => toggleFeatured(productId)}
        className="ui right corner label"
      >
        <i className="star icon"></i>
      </a>
    )}
  </span>
);

Featured.propTypes = {
  featured: PropTypes.bool.isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};

export default Featured;
