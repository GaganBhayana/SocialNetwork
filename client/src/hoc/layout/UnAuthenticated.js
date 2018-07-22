import React from 'react';
import Particles from 'react-particles-js';
import Aux from '../Aux';
import Background from '../../assets/img/unAuthenticated.jpg';

const UnAuthenticated = (props) => {
  const style = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${Background})`
  }

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
  }

  return (
    <Aux>
      <Particles style={style} params={params}/>
      {props.children}
    </Aux>
  );
}

export default UnAuthenticated;
