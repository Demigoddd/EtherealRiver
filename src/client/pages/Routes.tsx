import React from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';

// Component Imports
import Content from './Content';
import Auth from '../index/Auth';
import NotFound from '../index/NotFound';

const Routes: React.FC<any> = ({ isAuth }) => {
  console.log("AUTH: ", isAuth);
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

export default connect(({ user }: any) => ({ isAuth: user.isAuth }))(Routes);
