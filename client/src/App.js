import React, { Component } from 'react';
import {Switch, Route} from 'react-router';

import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import NotFound from './containers/NotFound';
import Layout from './hoc/layout/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/' component={Home} />
          <Route path='' component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
