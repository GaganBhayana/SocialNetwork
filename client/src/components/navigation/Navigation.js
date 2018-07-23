import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from '../../utils/axios';

import AuthService from '../../utils/authService';
import WithAuth from '../../hoc/WithAuth';
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
      img: '',
    }
  }

  componentDidMount() {
    axios.get('/user/', {
      headers: {'x-access-token': this.Auth.getToken()}
    })
      .then(res => {
        this.setState({
          img: res.data.img
        });
      })
      .catch(err => {
        console.log(err);
      });
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
          img={this.state.img}/>
      </Aux>
    );
  }
}

export default withRouter(WithAuth(Navigation));
