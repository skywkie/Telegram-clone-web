import express from "express";
import http from "http";

import { register } from "./service/index.js";

const PORT = 5000;

const app = express();

app.use(express.json());

app.post("/api/auth/register", register);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log("@http server listen at port", PORT);
});
