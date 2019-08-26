import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Component Imports
import { Content } from './Content';
import { Auth } from '../index/Auth';

const isAuth = true;

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={["/login", "/register", "/register/verify"]} component={Auth} />
      <Route path="/" render={() => (isAuth ? <Content /> : <Redirect to="/login" />)} />
    </Switch>
  );
};
