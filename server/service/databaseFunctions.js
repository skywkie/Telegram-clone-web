import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createNewUser_SQLRequest,
  getHashPasswordAndSalt_SQLRequest,
  getUserInfo_SQLRequest,
} from "../database/databaseSQLRequests.js";

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

export async function register(req, res) {
  const userName = req.body.userName;
  const password = req.body.password;

  const userId = Math.floor(Date.now() / 1000);

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const result = await createNewUser_SQLRequest(userId, userName, hashPassword, salt);

    // TODO: Провекра результата запроса к бд

    const token = jwt.sign({ userId }, SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({ token, userId });
  } catch (err) {
    res.status(400).send({
      message: "@Register ERROR",
    });
  }
}

export async function login(req, res) {
  const userName = req.body.userName;
  const password = req.body.password;

  try {
    const result = await getHashPasswordAndSalt_SQLRequest(userName);
    const userId = result.id;
    const salt = result.salt;

    const hashedPasswordFromUser = bcrypt.compare(password, salt);
    const hashPasswordFromDatabase = result.hashPassword;

    if (hashPasswordFromDatabase === hashedPasswordFromUser) {
      const token = jwt.sign({ userId });

      const userData = await getUserInfo_SQLRequest(userId);

      res.status(200).send({ token, userId });
    } else {
      throw Error;
    }
  } catch (err) {
    res.status(500).send({
      message: "@Login ERROR",
    });
  }
}

export async function loginByToken(req, res) {
  const token = req.body.token;

  try {
    const userId = jwt.verify(token, SECRET).userId;

    const userData = await getUserInfo_SQLRequest(userId);

    res.status(200).send({ userName: userData.userName, token, userId });
  } catch (err) {
    res.status(400).send({
      message: "@Login by token ERROR",
    });
  }
}
