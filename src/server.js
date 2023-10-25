import http from "node:http";
import path from "path"

import express from "express";
import { Server } from "socket.io";
import morgan from "morgan";
import { v4 as uuid } from "uuid";
import { createClient } from "@libsql/client/";


const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve("./src/public")));

app.get("/", (req, res) => {
  res.send("hola mundo");
});


export default [
  server,
  io
];

