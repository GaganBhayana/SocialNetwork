import React from 'react';

import {
  WithAuth,
  Aux
} from '../hoc/Hoc';

import {
  Posts
} from '../components/Components';

const UserProfile = () => {
  return (
    <Aux>
      <h1>User Profile</h1>
      <Posts />
    </Aux>
  );
}

export default WithAuth(UserProfile);
