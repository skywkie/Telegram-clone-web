CREATE DATABASE telegram_clone;
USE telegram_clone;

CREATE TABLE users (
	userId INTEGER NOT NULL PRIMARY KEY,
	email INTEGER NOT NULL UNIQUE,
	userName VARCHAR(20) NOT NULL,
	password VARCHAR(100) NOT NULL,
)

-- INSERT INTO users (userId, email, userName, password) 
-- VALUES
-- (0, "email", "userName", "password"); -- test
