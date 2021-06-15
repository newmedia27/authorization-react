import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Categories from "./containers/categories";
import Home from "./containers/home/Home";
import PrivateRoute from "./services/roeutes/PrivateRoute";

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
        <PrivateRoute auth exact path="/categories">
          <Categories />
        </PrivateRoute>

        <PrivateRoute exact path="/register">
          <Registration />
        </PrivateRoute>
        <PrivateRoute path="/login">
          <Login />
        </PrivateRoute>
        <Route path="*">
          <div>Not found!!!</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
