import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { authorizationSelector } from "../../reducers/auth";

const PrivateRoute = ({ auth, ...props }) => {
  const authorization = useSelector(authorizationSelector);
  const flag = auth ? authorization : !authorization;
  return flag ? <Route {...props} /> : <Redirect to="/" />;
};

export default PrivateRoute;
