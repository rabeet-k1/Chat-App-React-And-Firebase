import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { store } from "./../../store/store";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);

  return (
    <header className="header">
      <div style={{ display: "flex" }}>
        <div className="logo">Chat App</div>
        {!auth.authenticated ? (
          <ul className="leftMenu">
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/signup"}>Signup</NavLink>
            </li>
          </ul>
        ) : null}
      </div>
      <div style={{ margin: "20px 0", color: "#fff", fontWeight: "bold" }}>
        {auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}` : ""}
      </div>
      <ul className="menu">
        {auth.authenticated ? (
          <li>
            <Link
              to={`#`}
              onClick={() => {
                store.dispatch(logout(auth.uid));
              }}
            >
              Logout
            </Link>
          </li>
        ) : null}
      </ul>
    </header>
  );
};

export default Header;
