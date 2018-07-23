import React, { Component } from 'react';
import {Switch, Route} from 'react-router';

import {
  Home,
  Login,
  Register,
  NotFound,
  UserProfile
} from './containers/Containers';

import Layout from './hoc/layout/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/me' component={UserProfile} />
          <Route exact path='/' component={Home} />
          <Route path='' component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
