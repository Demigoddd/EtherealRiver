import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { PrivateRoute } from '../components/PrivateRoute';

// Component Imports
import { Content } from './Content';
import { Auth } from '../index/Auth';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Content} />
      <Route path={["/login", "/register", "/register/verify"]} component={Auth} />
    </Switch>
  );
};
