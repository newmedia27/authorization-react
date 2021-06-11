import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./containers/home/Home";

const Login = lazy(() => import("./containers/login"));
const Registration = lazy(() => import("./containers/register"));

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/register">
          <Registration />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <div>Not found!!!</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
