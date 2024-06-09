import express from "express";
import http from "http";

import dotenv from "dotenv";
dotenv.config();

import { login, loginByToken, register } from "./service/index.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.post("/api/auth/loginByToken", loginByToken);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log("@http server listen at port: ", PORT);
});
