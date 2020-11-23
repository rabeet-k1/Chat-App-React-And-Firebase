import React, { useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { signup } from "../../store/actions/authActions";
import { store } from "./../../store/store";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const SignupPage = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(signup({ firstName, lastName, email, password }));
  };

  if (auth.authenticated) return <Redirect to={`/`} />;

  return (
    <Layout>
      <div className="registerContainer">
        <Card>
          <form onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
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
              <button>Sign up</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default SignupPage;
