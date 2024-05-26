import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = { users: [] };

export async function register(req, res) {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const id = Date.now();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const token = jwt.sign({ id: Date.now() }, "secret", {
      expiresIn: "30d",
    });

    const userModel = { userName, id, token };

    const isFound = db.users.find((user) => user.userName === userModel.userName);

    if (isFound) {
      res.status(500).json({ ...userModel, error: "Такой пользователь уже есть" });
    } else {
      db.users.push(userModel);
      res.status(201).json(userModel);
    }
  } catch (err) {
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
}

export async function login(req, res) {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const token = jwt.sign({ id: Date.now() }, "secret", {
      expiresIn: "30d",
    });

    const id = Date.now();

    const userModel = { userName, id, token };

    function findUser() {
      const isFound = db.users.find((user) => user.userName === userName);
      const isMatchPasswords = db.users.find((user) => user.password === password);
      console.log(isMatchPasswords);
      if (isFound) return true;
      else return false;
    }

    if (findUser()) res.status(201).json(userModel);
    else
      res.status(400).json({
        message: "Не удалось войти совсем",
      });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось войти",
    });
  }
}
