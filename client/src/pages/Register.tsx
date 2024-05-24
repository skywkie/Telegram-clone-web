import React from "react";
import styles from "../styles/Register.module.scss";
import Button from "../components/Buttons/Button";
import axios from "axios";

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

  const [currentData, setCurrentData] = React.useState<IResponseData>();

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
        setCurrentData(response.data);
      })
      .catch((err) => console.log(err));
  }

  function validate() {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (EMAIL_REGEXP.test(userName) && password.length > 7) {
      console.log("username and password ok");
      return true;
    }
    if (!(userName.length > 3)) {
      console.log("username not ok");
      return false;
    }
    if (!(password.length > 7)) {
      console.log("password not ok");
      return false;
    }
  }

  console.log(currentData);

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
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={styles.register__input}
          type="password"
          placeholder="Your password"
          name="password"
        />
        <Button type="auth" label="Register" onClick={() => {}} />
      </form>
    </div>
  );
}

export default Register;
