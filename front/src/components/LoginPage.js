import React, { Component } from 'react';
import LoginForm from './LoginForm';
import api from '../api';
import PropTypes from 'prop-types';

class LoginPage extends Component {
  submit = (data) =>
    api.users.login(data).then((token) => {
      this.props.login(token);
      this.props.history.push('/games');
    });

  render() {
    return (
      <div className="ui segment">
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginPage;
