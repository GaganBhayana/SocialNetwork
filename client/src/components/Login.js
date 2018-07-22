import React, { Component } from 'react';

import AuthService from '../utils/authService';
import LoginForm from './forms/authentication/AuthenticationForm';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {
          email: '',
          password: '',
          fields: {
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

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    componentWillMount() {
      if (this.Auth.loggedIn()) {
        this.props.history.replace('/');
      }
    }

    handleFormSubmit = (event) => {
      event.preventDefault();
      this.Auth.login(this.state.email, this.state.password)
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

    render() {
      return (
        <LoginForm
          title='Log in'
          fields={this.state.fields}
          buttonText='Log in'
          footerText1='Not registered yet?'
          footerText2='Sign Up'
          footerLink='/register'
          changed={this.handleChange}
          submit={this.handleFormSubmit}
          values={{
            email: this.state.email,
            password: this.state.password
          }}/>
      );
    }
}

export default Login;
