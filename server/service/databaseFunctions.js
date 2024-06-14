import {
  createNewUserWithEmail_SQLRequest,
  getPasswordAndUserIdByEmail_SQLRequest,
} from "../database/databaseSQLRequests.js";

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

export async function register(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const userId = Math.floor(Date.now() / 1000);

  try {
    await createNewUserWithEmail_SQLRequest(userId, email, password);

    // TODO: Провекра результата запроса к бд

    res.status(200).send({ userId, token: "test token" });
  } catch (err) {
    res.status(400).send({
      message: "@Register ERROR",
    });
  }
}

export async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await getPasswordAndUserIdByEmail_SQLRequest(email);

    const userId = result.userId;

    const passwordFromDatabase = result.password;

    if (password === passwordFromDatabase) {
      // const token = jwt.sign({ userId });

      res.status(200).send({ userId, token: "test token" });
    } else {
      throw Error;
    }
  } catch (err) {
    res.status(500).send({
      message: "@Login ERROR",
    });
  }
}

// export async function loginByToken(req, res) {
//   const token = req.body.token;

//   try {
//     const userId = jwt.verify(token, SECRET).userId;

//     const userData = await getUserInfo_SQLRequest(userId);

//     res.status(200).send({ userName: userData.userName, token, userId });
//   } catch (err) {
//     res.status(400).send({
//       message: "@Login by token ERROR",
//     });
//   }
// }
