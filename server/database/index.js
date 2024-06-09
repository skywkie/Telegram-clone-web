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

export async function createNewUserSQLRequest(id, userName, hashPassword, salt) {
  // TODO: Обработчик ошибок
  const [result] = await pool.query(
    `
			INSERT INTO users (id, userName, hashPassword, salt)
			VALUES (?, ?, ?, ?)
		`,
    [id, userName, hashPassword, salt]
  );
  return {
    id,
    userName,
    hashPassword,
    salt,
  };
}

export async function getHashPasswordAndSalt_SQLRequest(userName) {
  // TODO: Обработчик ошибок
  const [result] = await pool.query(
    `
			SELECT id, userName, hashPassword, salt FROM users
			WHERE userName = ?
		`,
    [userName]
  );
  return {
    id: result.id,
    userName,
    hashPassword: result.hashPassword,
    salt: result.salt,
  };
}

export async function getUserInfo_SQLRequest(id) {
  // TODO: Обработчик ошибок
  const [result] = await pool.query(
    `
			SELECT userName FROM users
			WHERE id = ?
		`,
    [id]
  );
  return {
    id,
    userName: result.userName,
  };
}
