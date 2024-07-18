import React from "react";
import { useNavigate } from "react-router-dom";

import "@/assets/styles/Login.scss";

import { useAppDispatch } from "@/hooks";
import { fetchLoginWithEmail } from "@/redux/authSlice";

import Button from "@/components/UI/Button";
import Field from "@/components/UI/Field";

const Login = (): React.ReactNode => {
  const [email, setEmail] = React.useState("test123@gmail.com");
  const [password, setPassword] = React.useState("12345678");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // TODO: Сделать обработчик ошибок для каждого поля с помощью хука useDebounce

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  async function onClick() {
    const userData = { email, password };

    const result = await dispatch(fetchLoginWithEmail(userData));

    if (result.payload === "@fetchRegistrationWithEmail") {
      return console.log("ты черт картавый (логин)");
    }
    console.log("@onClick login", result);

    navigate("/");
  }

  return (
    <div className="login">
      <h2 className="login__title">Sign in</h2>
      <form onSubmit={onSubmit} className="login__form">
        <Field
          variant="auth"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="login__input"
          type="text"
          placeholder="Your login"
          name="email"
        />
        <Field
          variant="auth"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="login__input"
          type="password"
          placeholder="Your password"
          name="password"
        />
        <Button variant="auth" onClick={onClick}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
