import React, { Component } from 'react';

import AuthService from '../utils/authService';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                      <button
                            type="submit"
                            onClick={this.handleFormSubmit}>submit</button>                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    componentWillMount() {
      if (this.Auth.loggedIn()) {
        this.props.history.replace('/');
      }
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
