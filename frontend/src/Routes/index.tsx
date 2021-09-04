import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from 'Components/Atoms/Route';
import Home from 'Pages/Home';
import Chat from 'Pages/Chat';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/chat" exact component={Chat} isPrivate />

      <Redirect from="*" to="/home" />
    </Switch>
  );
};

export default Routes;
