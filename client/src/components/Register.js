import React, { Component } from 'react';

import AuthService from '../utils/authService';
import SignupForm from './forms/authentication/AuthenticationForm';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
        this.state = {
          name: '',
          email: '',
          password: '',
          fields: {
            name: {
              type: 'text',
              name: 'name',
              placeholder: 'Your name',
            },
            email: {
              type: 'email',
              name: 'email',
              placeholder: 'Your email'
            },
            password: {
              type: 'password',
              name: 'password',
              placeholder: 'Your password',
              validation: {
                minLength: 8
              }
            }
          }
        };
    }

    componentWillMount() {
      if (this.Auth.loggedIn()) {
        this.props.history.replace('/');
      }
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    componentDidUpdate() {
      console.log(this.state.name);
    }

    render() {
      return (
        <SignupForm
          title='Sign up'
          fields={this.state.fields}
          buttonText='Register'
          footerText1='Already Registered?'
          footerText2='Log In'
          footerLink='/login'
          changed={this.handleChange}
          values={{
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          }} />
      );
    }

    handleFormSubmit = (e) => {
      e.preventDefault();
      this.Auth.login(this.state.username, this.state.password)
        .then((res) => {
          if (res.data.token) {
            this.Auth.setToken(res.data.token);
            this.props.history.replace('/');
          } else {
            throw new Error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    }
}

export default Login;
