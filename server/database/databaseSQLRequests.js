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

export async function createNewUser_SQLRequest(userId, userName, hashPassword, salt) {
  // TODO: Обработчик ошибок
  const [result] = await pool.query(
    `
			INSERT INTO users (userId, userName, hashPassword, salt) VALUES (?, ?, ?, ?);
		`,
    [userId, userName, hashPassword, salt]
  );
  return {
    userId,
    userName,
    hashPassword,
    salt,
  };
}

export async function getHashPasswordAndSalt_SQLRequest(userName) {
  // TODO: Обработчик ошибок
  const [result] = await pool.query(
    `
			SELECT userId, userName, hashPassword, salt FROM users WHERE userName = ?;
		`,
    [userName]
  );
  return {
    userId: result.userId,
    userName,
    hashPassword: result.hashPassword,
    salt: result.salt,
  };
}

export async function getUserInfo_SQLRequest(userId) {
  // TODO: Обработчик ошибок
  const [result] = await pool.query(
    `
			SELECT userName FROM users WHERE id = ?;
		`,
    [userId]
  );
  return { userName: result.userName, userId };
}
