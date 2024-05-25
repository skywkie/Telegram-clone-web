import React from "react";
import styles from "../styles/Register.module.scss";
import Button from "../components/Buttons/Button";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { AuthContext } from "../context/AuthContext,";

interface IUserData {
  userName: string;
  password: string;
}
interface IResponseData {
  userName: string;
  passwordHash: string;
  token: string;
}

function Register() {
  const [userName, setUserName] = React.useState("test123@gmail.com");
  const [password, setPassword] = React.useState("12345678");
  const [rep_password, setRep_Password] = React.useState("12345678");

  const [userNameError, setUserNameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [rep_passwordError, setRep_PasswordError] = React.useState("");

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

  async function sendUserData(data: IUserData) {
    await axios
      .post("/api/auth/register", data)
      .then((response) => {
        console.log("Data is sent");
        dispatch(
          setUser({
            userName: response.data.userName,
            id: response.data.id,
            token: response.data.token,
          })
        );
        setIsAuth(true);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  function validate() {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (EMAIL_REGEXP.test(userName) && rep_password === password) {
      console.log("username and password ok");
      setUserNameError("");
      setPasswordError("");
      setRep_PasswordError("");
      return true;
    } else if (!(userName.length > 3)) {
      console.log("username not ok");
      setUserNameError("Error! (UserName)");
      return false;
    } else if (!EMAIL_REGEXP.test(userName)) {
      console.log("username not ok");
      setUserNameError("Error! (UserName)");
      return false;
    } else if (!(password.length > 7)) {
      console.log("password not ok");
      setPasswordError("Error! (Password)");
      return false;
    } else if (!(password === rep_password)) {
      console.log("rep_password not ok");
      setRep_PasswordError("Error! (Rep_Password)");
      return false;
    }
  }

  return (
    <div className={styles.register}>
      <h2 className={styles.register__title}>Sign up</h2>
      <form onSubmit={onSubmit} className={styles.register__form}>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          className={styles.register__input}
          type="text"
          placeholder="Your login"
          name="username"
        />
        <span className={styles.register__errorLogin}>{userNameError}</span>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={styles.register__input}
          type="password"
          placeholder="Your password"
          name="password"
        />
        <span className={styles.register__error}>{passwordError}</span>
        <input
          onChange={(e) => setRep_Password(e.target.value)}
          value={rep_password}
          className={styles.register__input}
          type="password"
          placeholder="Your password"
          name="password"
        />
        <span className={styles.register__errorRepPassword}>{rep_passwordError}</span>
        <Button type="auth" label="Register" onClick={() => {}} />
      </form>
    </div>
  );
}

export default Register;
