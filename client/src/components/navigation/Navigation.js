import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import fetchCurrentUser from '../../redux/actions/userActions';
import stateToProps from '../../utils/stateToProps/currentUser';

//AVATAR IMAGE
import Avatar from '../../assets/img/avatar.jpg';

import AuthService from '../../utils/authService';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import Aux from '../../hoc/Aux';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();

    this.state = {
      drawerOpen: false,
      searchQuery: '',
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  handleSearch = (event) => {
    console.log(event.target.value);
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleDrawerToggle = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace('/');
  }

  render() {
    return(
      <Aux>
        <Navbar
          drawerToggle = {this.handleDrawerToggle}
          changed={this.handleSearch}
          searchQuery={this.searchQuery}/>
        <Sidebar
          show={this.state.drawerOpen}
          drawerToggle={this.handleDrawerToggle}
          changed={this.handleSearch}
          logout={this.handleLogout}
          searchQuery={this.searchQuery}
          img={this.props.user.img || Avatar}/>
      </Aux>
    );
  }
}

export default connect(stateToProps)(withRouter(Navigation));
