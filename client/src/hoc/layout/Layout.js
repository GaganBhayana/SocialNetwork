import React, {Component} from 'react';
import Particles from 'react-particles-js';

import Aux from '../Aux';
import Background from '../../assets/img/unAuthenticated.jpg';
import AuthService from '../../utils/authService';
import Navigation from '../../components/navigation/Navigation';
import classes from './Layout.css';

const params = {
  particles: {
    number: {
      value: 50
    },
    line_linked: {
      shadow: {
        enable: false,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
};


export default class Layout extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  render() {
    let layout = (
      <Aux>
        <Navigation/>
        <div className={classes.Main}>
          {this.props.children}
        </div>
      </Aux>
    );

    if(!this.Auth.loggedIn()) {
      layout = (
        <Aux>
          <Particles
            className={classes.Particles}
            style={{backgroundImage: `url(${Background})`}}
            params={params}/>
          {this.props.children}
        </Aux>
      );
    }

    return layout;
  }
};
