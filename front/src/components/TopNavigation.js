import React from 'react';
import PropTypes from 'prop-types';

const TopNavigation = ({ showGameForm }) => (
  <div className="ui secondary pointing menu">
    <a href="/" className="item">
      BGShop
    </a>
    {/* eslint-disable-next-line */}
    <a className="item" onClick={showGameForm}>
      <i className="icon plus"></i>Add New Game{' '}
    </a>
  </div>
);

TopNavigation.propTypes = {
  showGameForm: PropTypes.func.isRequired,
};

export default TopNavigation;
