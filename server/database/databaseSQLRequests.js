import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function createNewUserWithEmail_SQLRequest(userId, email, password) {
  // TODO: Обработчик ошибок
  const [result] = await pool.query(
    `INSERT INTO users (userId, email, userName, password) VALUES (?, ?, "", ?);`,
    [userId, email, password]
  );
  console.log(result);
  return {
    userId,
    email,
    password,
  };
}

export async function getPasswordByEmail_SQLRequest(email) {
  // TODO: Обработчик ошибок
  const [result] = await pool.query(
    `
			SELECT password FROM users WHERE email = ?;
		`,
    [email]
  );
  const passwordFromDatabaseObj = result[0].password;
  return {
    email,
    password: passwordFromDatabaseObj,
  };
}
