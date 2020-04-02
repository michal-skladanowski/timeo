import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./menuSidebar.module.scss";
import logo from "../../assets/logo.png";
import { signOut } from "../../store/actions/authAction";
import { connect } from "react-redux";

const MenuSidebar = ({ logout }) => {
  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="Timeo logo" />
      <nav>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <NavLink
              exact
              activeClassName={styles.navItemLinkActive}
              className={styles.navItemLink}
              to="/"
            >
              Timer
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              activeClassName={styles.navItemLinkActive}
              className={styles.navItemLink}
              to="/projects"
            >
              Projects
            </NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(signOut())
  };
};
export default connect(null, mapDispatchToProps)(MenuSidebar);
