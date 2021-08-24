import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from 'Pages/Home';
import Chat from 'Pages/Chat';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/chat" exact component={Chat} />

      <Redirect from="*" to="/home" />
    </Switch>
  );
};

export default Routes;
