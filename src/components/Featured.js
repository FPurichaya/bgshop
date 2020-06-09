import React from 'react';
import PropTypes from 'prop-types';

const Featured = ({ featured }) => (
  <span>
    {featured ? (
      <a href="http://duckduckgo.com" className="ui right yellow corner label">
        <i className="star icon"></i>
      </a>
    ) : (
      <a href="http://duckduckgo.com" className="ui right corner label">
        <i className="star icon"></i>
      </a>
    )}
  </span>
);

Featured.propTypes = {
  Featured: PropTypes.bool.isRequired,
};

export default Featured;
