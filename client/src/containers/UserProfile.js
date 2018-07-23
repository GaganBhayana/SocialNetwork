import React from 'react';

import {
  WithAuth
} from '../hoc/Hoc';

const UserProfile = () => {
  return (
    <h1>User Profile</h1>
  );
}

export default WithAuth(UserProfile);
