import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Component Imports
import Content from './Content';
import Auth from '../index/Auth';
import NotFound from '../index/NotFound';

const isAuth = true;

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => (
        isAuth ?  <Content /> : <Redirect to="/login" />
      )} />
      <Route exact path={["/login", "/register", "/register/verify"]} render={() => (
        isAuth ?  <Redirect to="/" /> : <Auth />
      )} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
