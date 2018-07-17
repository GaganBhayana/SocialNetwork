import React, { Component } from 'react';
import {Switch, Route} from 'react-router';

import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import SignUp from './components/forms/SignUp';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/sign-up' component={SignUp} />
        <Route exact path='/' component={Home} />
        <Route path='' component={NotFound} />
      </Switch>
    );
  }
}

export default App;
