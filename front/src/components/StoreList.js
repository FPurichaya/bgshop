import React from 'react';
import PropTypes from 'prop-types';
import StoreCard from './StoreCard';
import Message from './Message';

const StoreList = ({ stores, toggleFeatured, deleteStore, user }) => (
  <div className="ui four cards">
    {stores.length === 0 ? (
      <div className="ui icon message">
        <Message header="Header" content="Message" type="default" />
      </div>
    ) : (
      stores.map((item) => (
        <StoreCard
          store={item}
          key={item._id}
          toggleFeatured={toggleFeatured}
          deleteStore={deleteStore}
          user={user}
        />
      ))
    )}
  </div>
);

StoreList.propTypes = {
  stores: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteStore: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

StoreList.defaultProps = {
  stores: [],
};

export default StoreList;
