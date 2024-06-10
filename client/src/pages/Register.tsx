import React from "react";

import Button from "../components/Buttons/Button";
import "../styles/Register.scss";

import { useAppDispatch } from "../hooks";
import { fetchRegistration } from "../redux/authenticationSlice";

function Register() {
  const [userName, setUserName] = React.useState("test123@gmail.com");
  const [password, setPassword] = React.useState("12345678");
  const [rep_password, setRep_Password] = React.useState("12345678");

  const dispatch = useAppDispatch();

  // TODO: Сделать обработчик ошибок для каждого поля с помощью хука useDebounce

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

	function onClick() {
		const userData = {userName, password}

    dispatch(fetchRegistration(userData));
  }

  return (
    <div className="register">
      <h2 className="register__title">Sign up</h2>
      <form onSubmit={onSubmit} className="register__form">
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          className="register__input"
          type="text"
          placeholder="Your login"
          name="username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="register__input"
          type="password"
          placeholder="Your password"
          name="password"
        />
        <input
          onChange={(e) => setRep_Password(e.target.value)}
          value={rep_password}
          className="register__input"
          type="password"
          placeholder="Your password"
          name="password"
        />
        <Button type="auth" label="Register" onClick={onClick} />
      </form>
    </div>
  );
}

export default Register;
