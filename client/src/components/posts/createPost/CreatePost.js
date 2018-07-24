import React, {Component} from 'react';

import {
  WithAuth
} from '../../../hoc/Hoc';

import AuthService from '../../../utils/authService';

import classes from './CreatePost.css';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }


}
