const express = require("express");
const http = require("http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ws = require("ws");

const PORT = 5000;

const app = express();

app.use(express.json());

app.post("/api/auth/register", async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const token = jwt.sign({ id: Date.now() }, "secret", {
      expiresIn: "30d",
    });

    res.status(201).json({ userName, passwordHash, token });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log("@http server listen at port", PORT);
});

// const wsServer = new ws.WebSocketServer({ httpServer });

// wsServer.on("connection", (ws) => {
//   ws.send("<span>Web wocket connection</span>");
// });
