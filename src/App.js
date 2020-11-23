import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./containers/HomePage/index";
import LoginPage from "./containers/LoginPage/index";
import SignupPage from "./containers/SignupPage/index";
import PrivateRoute from "./components/PrivateRoute";
import { isLoggedInUser } from "./store/actions/authActions";
import { store } from "./store/store";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticated) store.dispatch(isLoggedInUser());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <PrivateRoute path="/" exact component={HomePage} />

        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
