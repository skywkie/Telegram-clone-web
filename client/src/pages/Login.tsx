import React from "react";
import Button from "../components/Buttons/Button";
import "../styles/Login.scss";
import { useAppDispatch } from "../hooks";
import { fetchLogin } from "../redux/authenticationSlice";

function Login() {
  const [userName, setUserName] = React.useState("root");
  const [password, setPassword] = React.useState("7819345609");

  const dispatch = useAppDispatch();

  // TODO: Сделать обработчик ошибок для каждого поля с помощью хука useDebounce

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  function onClick() {
    const userData = { userName, password };

    dispatch(fetchLogin(userData));
  }

  return (
    <div className="login">
      <h2 className="login__title">Sign in</h2>
      <form onSubmit={onSubmit} className="login__form">
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          className="login__input"
          type="text"
          placeholder="Your login"
          name="username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="login__input"
          type="password"
          placeholder="Your password"
          name="password"
        />
        <Button type="auth" label="Login" onClick={onClick} />
      </form>
    </div>
  );
}

export default Login;
