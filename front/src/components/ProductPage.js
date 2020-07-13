import React from 'react';
import PropTypes from 'prop-types';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import StoreList from './StoreList';
import StoreForm from './StoreForm';
import api from '../api';
import AdminRoute from './AdminRoute';

const producers = [
  {
    _id: '1',
    name: 'JK Lovely Dolls',
  },
  {
    _id: '2',
    name: 'KASAMA No.88',
  },
  {
    _id: '3',
    name: 'JUNG',
  },
  {
    _id: '4',
    name: 'Saluem Salue',
  },
  {
    _id: '5',
    name: 'Madam Sugar',
  },
];

class StoresPage extends React.Component {
  state = {
    storeDetails: [],
    loading: true,
  };

  componentDidMount() {
    api.stores
      .fetchAll()
      .then((stores) =>
        this.setState({ storeDetails: this.sortStores(stores), loading: false })
      );
  }

  sortStores(storeDetails) {
    return _orderBy(storeDetails, ['featured', 'name'], ['desc', 'asc']);
  }

  toggleFeatured = (storeId) => {
    const store = _find(this.state.storeDetails, { _id: storeId });
    return this.updateStore({
      ...store,
      featured: !store.featured,
    });
  };

  saveStore = (store) =>
    (store._id ? this.updateStore(store) : this.addStore(store)).then(() =>
      this.props.history.push('/stores')
    );

  addStore = (storeData) =>
    api.stores.create(storeData).then((store) =>
      this.setState({
        storeDetails: this.sortStores([...this.state.storeDetails, store]),
        showStoreForm: false,
      })
    );

  updateStore = (storeData) =>
    api.stores.update(storeData).then((store) =>
      this.setState({
        storeDetails: this.sortStores(
          this.state.storeDetails.map((item) =>
            item._id === store._id ? store : item
          )
        ),
        showStoreForm: false,
      })
    );

  deleteStore = (store) =>
    api.stores.delete(store).then(() =>
      this.setState({
        storeDetails: this.state.storeDetails.filter(
          (item) => item._id !== store._id
        ),
      })
    );

  render() {
    const numberOfColumns =
      this.props.location.pathname === '/stores' ? 'sixteen' : 'ten';

    return (
      <div className="ui container">
        <div className="ui stackable grid">
          <AdminRoute
            user={this.props.user}
            path="/stores/new"
            render={() => (
              <div className="six wide column">
                <StoreForm
                  producers={producers}
                  submit={this.saveStore}
                  store={{}}
                />
              </div>
            )}
          />

          <AdminRoute
            user={this.props.user}
            path="/stores/edit/:_id"
            render={(props) => (
              <div className="six wide column">
                <StoreForm
                  producers={producers}
                  submit={this.saveStore}
                  store={
                    _find(this.state.storeDetails, {
                      _id: props.match.params._id,
                    }) || {}
                  }
                />
              </div>
            )}
          />

          <div className={`${numberOfColumns} wide column`}>
            {this.state.loading ? (
              <div className="ui icon message">
                <i className="notched circle loading icon"></i>
                <div className="content">
                  <div className="header">Wait a second!!</div>
                  <p>Stores collection is loading...</p>
                </div>
              </div>
            ) : (
              <StoreList
                stores={this.state.storeDetails}
                toggleFeatured={this.toggleFeatured}
                deleteStore={this.deleteStore}
                user={this.props.user}
              />
            )}
          </div>
        </div>

        <br />
      </div>
    );
  }
}

StoresPage.defaultProps = {
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default StoresPage;
