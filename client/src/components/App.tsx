import React from "react";
import { Link } from "react-router-dom";
import { getRoutes } from "../routes";

import "../styles/App.scss";

import { AuthContext, AuthContextValues } from "../context/AuthContext,";

function App() {
  const { isAuth, setIsAuth } = React.useContext(AuthContext) as AuthContextValues;

  return (
    <div className="wrapper">
      <div className="inner">
        <div className="inner__container">
          <Link to="/auth/login">to Login</Link>
          <br />
          <Link to="/auth/register">to Register</Link>
          {getRoutes(isAuth)}
        </div>
      </div>
    </div>
  );
}

export default App;
