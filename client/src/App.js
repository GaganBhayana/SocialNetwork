import React, { Component } from 'react';
import {Switch, Route} from 'react-router';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import UnAuthenticated from './hoc/layout/UnAuthenticated';
import Aux from './hoc/Aux';

class App extends Component {
  render() {
    return (
      <Aux>
        <UnAuthenticated>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='' component={NotFound} />
          </Switch>
        </UnAuthenticated>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Aux>
    );
  }
}

export default App;
