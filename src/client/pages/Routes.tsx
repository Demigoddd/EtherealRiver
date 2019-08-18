import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Component Imports
import { Content } from './Content';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Content} />
    </Switch>
  );
};
