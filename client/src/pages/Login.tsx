import React from "react";
import Button from "../components/Buttons/Button";
import "../styles/Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setUser } from "../redux/userSlice";
import { AuthContext } from "../context/AuthContext,";

interface IUserData {
  userName: string;
  password: string;
}

function Login() {
  const [userName, setUserName] = React.useState("test123@gmail.com");
  const [password, setPassword] = React.useState("12345678");

  const [userNameError, setUserNameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const { isAuth, setIsAuth } = React.useContext(AuthContext);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (validate()) {
      const userData: IUserData = { userName, password };
      sendUserData(userData);
    }
  }

  async function sendUserData(userData: IUserData) {
    await axios.post("/api/auth/login", userData).then((response) => {
      console.log("Data is sent", response.data);
      dispatch(
        setUser({
          userName: response.data.userName,
          id: response.data.id,
          token: response.data.token,
        })
      );
      setIsAuth(true);
      navigate("/");
    });
  }

  function validate() {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (EMAIL_REGEXP.test(userName) && password.length > 7) {
      console.log("username and password ok");
      setUserNameError("");
      setPasswordError("");
      return true;
    }
    if (!(userName.length > 3)) {
      console.log("username not ok");
      setUserNameError("Error! (UserName)");
      return false;
    }
    if (!EMAIL_REGEXP.test(userName)) {
      console.log("username not ok");
      setUserNameError("Error! (UserName)");
      return false;
    }
    if (!(password.length > 7)) {
      console.log("password not ok");
      setPasswordError("Error! (Password)");
      return false;
    }
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
        <span className="login__errorLogin">{userNameError}</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="login__input"
          type="password"
          placeholder="Your password"
          name="password"
        />
        <span className="login__errorPassword">{passwordError}</span>
        <Button type="auth" label="Login" onClick={() => {}} />
      </form>
    </div>
  );
}

export default Login;
