import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card/index";
import { store } from "./../../store/store";
import { signin } from "./../../store/actions/authActions";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./style.css";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }

    if (password === "") {
      alert("Password is required");
      return;
    }

    store.dispatch(signin({ email, password }));
  };

  if (auth.authenticated) return <Redirect to={`/`} />;

  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <form onSubmit={handleUserLogin}>
            <h3>Login</h3>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div>
              <button>Login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
