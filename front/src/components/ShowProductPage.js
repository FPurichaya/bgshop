import React from 'react';
import api from '../api';
import ProductDetails from './ProductDetails';

class ShowProductPage extends React.Component {
  state = {
    product: {},
    loading: true,
  };

  componentDidMount() {
    api.store
      .fetchById(this.props.match.params._id)
      .then((product) => this.setState({ product, loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <ProductDetails product={this.state.product} />
        )}
      </div>
    );
  }
}

export default ShowProductPage;
