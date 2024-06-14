import React from "react";
import Button from "../components/Buttons/Button";
import "../styles/Login.scss";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchLoginWithEmail } from "../redux/authSlice";

function Login() {
  const [email, setEmail] = React.useState("test123@gmail.com");
  const [password, setPassword] = React.useState("12345678");

  const dispatch = useAppDispatch();

  const userObject = useAppSelector((state) => state.userSlice);
  console.log(userObject);

  // TODO: Сделать обработчик ошибок для каждого поля с помощью хука useDebounce

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  async function onClick() {
    const userData = { email, password };

    await dispatch(fetchLoginWithEmail(userData)); // TODO
  }

  return (
    <div className="login">
      <h2 className="login__title">Sign in</h2>
      <form onSubmit={onSubmit} className="login__form">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="login__input"
          type="text"
          placeholder="Your login"
          name="email"
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
