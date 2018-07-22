import React from 'react';
import {Col} from 'mdbreact';

import Background from '../assets/img/404.png';

const NotFound = (props) => {
  const imgContainer = {
    display: 'flex',
    margin: 'auto',
    height: '100vh',
    alignItems: 'center'
  };

  return (
    <div
      className='col-lg-8'
      style={imgContainer}>
      <img
        src={Background}
        width='100%'
        alt='404 Not Found'/>
    </div>
  );
};

export default NotFound;
