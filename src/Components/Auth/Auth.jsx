import React, { useContext } from 'react';
import { When } from 'react-if';
import { LoginContext } from '../../Context/LoginContext';

const Auth = ({ capability, children }) => {
  const { loggedIn, can } = useContext(LoginContext);
  const okToRender = loggedIn && (!capability || can(capability));

  return <When condition={okToRender}>{children}</When>;
};

export default Auth;
