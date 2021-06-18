import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authorizationSelector, logout } from "../../reducers/auth";

import styles from "./header.module.sass";

const Header = () => {
  const auth = useSelector(authorizationSelector);
  return (
    <header className={styles.header}>
      <Link to="/">Home</Link>
      <ul className={styles.nav}>
        <AuthLinks auth={auth} />
        <NoAuthLinks auth={auth} />
      </ul>
    </header>
  );
};

export default Header;

function NoAuthLinks({ auth }) {
  if (auth) {
    return null;
  }

  return (
    <>
      <li>
        <Link to="/register">Sign-up</Link>
      </li>
      <li>or</li>
      <li>
        <Link to="/login">Sign-in</Link>
      </li>
    </>
  );
}

function AuthLinks({ auth }) {
  if (!auth) {
    return null;
  }
  return (
    <>
      <li>
        <Link to="/categories">Categories</Link>
      </li>
      <li>
        <Logout />
      </li>
    </>
  );
}

function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return <button onClick={handleLogout}>Logout</button>;
}
