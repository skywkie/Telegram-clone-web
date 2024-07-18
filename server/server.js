import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";

import { register, login } from "./service/databaseFunctions.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
// app.post("/api/auth/loginByToken", loginByToken);

// TODO: ебнуться головой и использовать mock server config ???

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  // path: "/test",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connected`);
});

httpServer.listen(PORT, () => {
  console.log("@http server listen at port: ", PORT);
});
