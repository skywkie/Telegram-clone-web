CREATE DATABASE telegram_clone;
USE telegram_clone;

CREATE TABLE users (
	userId INTEGER NOT NULL PRIMARY KEY,
	userName VARCHAR(20) NOT NULL,
	hashPassword VARCHAR(100) NOT NULL,
	salt VARCHAR(200) NOT NULL,
)

-- INSERT INTO users (userId, userName, hashPassword, salt) 
-- VALUES
-- (0, 'root', "7819345609", "salt"); -- test
