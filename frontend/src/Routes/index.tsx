import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from 'Pages/Home';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />

      <Redirect from="*" to="/home" />
    </Switch>
  );
};

export default Routes;
