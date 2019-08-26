import React from 'react';
import { Route } from "react-router-dom";

import Login from './auth/Login';
import Register from './auth/Register';
import CheckEmailInfo from './auth/CheckEmailInfo';

const Auth: React.FC = () => {
  return (
    <div className="auth">
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/register/verify" component={CheckEmailInfo} />
    </div>
  );
};

export default Auth;