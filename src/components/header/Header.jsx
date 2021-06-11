import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.sass";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">Home</Link>
      <ul className={styles.nav}>
        <li>
          <Link to="/login">Sign-in</Link>
        </li>
        <li>or</li>
        <li>
          <Link to="/register">Sign-up</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
