import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Welcome from "./pages/welcome/Welcome.page";
import Result from "./pages/result/Result.page";
import Gameplay from "./pages/gameplay/Gameplay.page";
import { GAMEPLAY_ROUTE, WELCOME_ROUTE, RESULT_ROUTE } from "./config";

import "./App.scss";

const App = () => (
  <Router>
    <Switch>
      <Route path={WELCOME_ROUTE} exact>
        <Welcome />
      </Route>
      <Route path={GAMEPLAY_ROUTE}>
        <Gameplay />
      </Route>
      <Route path={RESULT_ROUTE}>
        <Result />
      </Route>
    </Switch>
  </Router>
);

export default App;
