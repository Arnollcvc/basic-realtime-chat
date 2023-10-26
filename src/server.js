import http from "node:http";
import path from "path"

import express from "express";
import { Server } from "socket.io";
import morgan from "morgan";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve("./src/public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./src/public/index.html"));
});

export default io;
