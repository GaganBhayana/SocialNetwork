import React, {Component} from 'react';

import AuthService from '../utils/authService';

import {
  WithAuth,
  Aux
} from '../hoc/Hoc';

class Home extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <Aux>
        <h1>Logged In</h1>
        <button onClick={this.handleLogout}>Logout</button>
      </Aux>
    );
  }
}

export default WithAuth(Home);
