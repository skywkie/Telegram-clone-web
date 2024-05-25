import express from "express";
import http from "http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PORT = 5000;

const app = express();

const db = { users: [] };

app.use(express.json());

app.post("/api/auth/register", async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const id = Date.now();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const token = jwt.sign({ id: Date.now() }, "secret", {
      expiresIn: "30d",
    });

    const userModel = { userName, passwordHash, token };

    const finded = db.users.find((user) => user.userName === userModel.userName);
    console.log(finded, !finded);

    if (db.users.find((user) => user.userName === userModel.userName)) {
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
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log("@http server listen at port", PORT);
});
