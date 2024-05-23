import React from "react";
import styles from "../styles/Register.module.scss";
import Button from "../components/Buttons/Button";
import axios from "axios";

interface IUserData {
  userName: string;
  password: string;
}

function Register() {
  const [userName, setUserName] = React.useState("Самыйебнутыйлогин");
  const [password, setPassword] = React.useState("Самыйебнутыйпароль");

  const [currentData, setCurrentData] = React.useState<any>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const userData: IUserData = { userName, password };

    sendUserData(userData);
  }

  async function sendUserData(data: any) {
    const userData = JSON.stringify(data);

    await axios
      .post("/api/auth/register", data)
      .then((response) => {
        console.log("Data is sent");
        setCurrentData(response);
      })
      .catch((err) => console.log(err));
  }

  function validate() {
    if (userName.length > 3 && password.length > 7) {
      console.log("ok");
    }
    if (!(userName.length > 3)) {
      console.log("username not ok");
    }
    if (!(password.length > 7)) {
      console.log("password not ok");
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
        <Button type="auth" label="Register" onClick={validate} />
      </form>
    </div>
  );
}

export default Register;
