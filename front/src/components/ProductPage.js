import React from 'react';
import PropTypes from 'prop-types';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
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

class ProductPage extends React.Component {
  state = {
    productDetails: [],
    loading: true,
  };

  componentDidMount() {
    api.store
      .fetchAll()
      .then((store) =>
        this.setState({ productDetails: this.sortStore(store), loading: false })
      );
  }

  sortStore(productDetails) {
    return _orderBy(productDetails, ['featured', 'name'], ['desc', 'asc']);
  }

  toggleFeatured = (productId) => {
    const product = _find(this.state.productDetails, { _id: productId });
    return this.updateProduct({
      ...product,
      featured: !product.featured,
    });
  };

  saveProduct = (product) =>
    (product._id
      ? this.updateProduct(product)
      : this.addProduct(product)
    ).then(() => this.props.history.push('/store'));

  addProduct = (productData) =>
    api.store.create(productData).then((product) =>
      this.setState({
        productDetails: this.sortStore([...this.state.productDetails, product]),
        showProductForm: false,
      })
    );

  updateProduct = (productData) =>
    api.store.update(productData).then((product) =>
      this.setState({
        productDetails: this.sortStore(
          this.state.productDetails.map((item) =>
            item._id === product._id ? product : item
          )
        ),
        showProductForm: false,
      })
    );

  deleteProduct = (product) =>
    api.store.delete(product).then(() =>
      this.setState({
        productDetails: this.state.productDetails.filter(
          (item) => item._id !== product._id
        ),
      })
    );

  render() {
    const numberOfColumns =
      this.props.location.pathname === '/store' ? 'sixteen' : 'ten';

    return (
      <div className="ui container">
        <div className="ui stackable grid">
          <AdminRoute
            user={this.props.user}
            path="/store/new"
            render={() => (
              <div className="six wide column">
                <ProductForm
                  producers={producers}
                  submit={this.saveProduct}
                  product={{}}
                />
              </div>
            )}
          />

          <AdminRoute
            user={this.props.user}
            path="/store/edit/:_id"
            render={(props) => (
              <div className="six wide column">
                <ProductForm
                  producers={producers}
                  submit={this.saveProduct}
                  product={
                    _find(this.state.productDetails, {
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
                  <p>Product collection is loading...</p>
                </div>
              </div>
            ) : (
              <ProductList
                store={this.state.productDetails}
                toggleFeatured={this.toggleFeatured}
                deleteProduct={this.deleteProduct}
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

ProductPage.defaultProps = {
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default ProductPage;
