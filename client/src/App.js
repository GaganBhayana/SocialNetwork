import React, { Component } from 'react';
import {Switch, Route} from 'react-router';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route exact path='/' component={Home} />
        <Route path='' component={NotFound} />
      </Switch>
    );
  }
}

export default App;
