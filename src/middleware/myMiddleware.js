import isPast from "date-fns/isPast";
import {  RESET_AUTH } from "../reducers/auth";

export function myMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      console.log(action.type);
      const state = getState();
      const token = state.auth.token;
      console.log(validateToken(token), "ACTION");

      if (token && !validateToken(token)) {
        localStorage.removeItem("token");
        return dispatch({
          type: RESET_AUTH,
        });
      }
    }
    return next(action);
  };
}

function validateToken(token) {
  if (typeof token !== "string") {
    return false;
  }
  const prepareToken = token.split(".")[1] || undefined;
  if (!prepareToken) {
    return false;
  }
  const { exp } = JSON.parse(atob(prepareToken));
  if (!exp) {
    return false;
  }
  const expirion = Math.abs(exp * 1000);
  const result = isPast(new Date(expirion));
  return !result;
}
