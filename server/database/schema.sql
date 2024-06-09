CREATE DATABASE telegram_clone;
USE telegram_clone;

CREATE TABLE users (
	id INTEGER NOT NULL PRIMARY KEY,
	userName VARCHAR(20) NOT NULL,
	hashPassword VARCHAR(200) NOT NULL,
	salt VARCHAR(200) NOT NULL,
)

INSERT INTO users (id, userName, hashPassword, salt) 
VALUES
(0, 'root', "7819345609", "salt"); -- test