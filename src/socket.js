import { io, server } from "./server.js";
import { getClient as client } from "./db.js";

import { v4 as uuid } from "uuid";

io.on("connection", async (socket) => {
  console.log(`a user connected: ${socket.id}`);
  
  /* envia el id y el msg */
  socket.emit("loadPrev", await prevMsgs());
  socket.on("newMsg", async (msg) => {
    if (msg.length <= 0) return;
    const id = uuid();
    let data = { id, msg };
    socket.broadcast.emit("newMsg", data);
    socket.emit("updateList", data);
    await saveMsg(data);
  });
});

async function saveMsg({ id, msg }) {
  try {
    await client().execute({
      sql: `INSERT INTO Message (id, msg) VALUES (?, ?)`,
      args: [id, msg]
    });
    console.log(`Mensaje '${msg}' guardado!`);
  } catch (err) {
    console.error(err.stack);
  }
}
  
async function prevMsgs() {
  try {
    let data = await client().execute(`SELECT * FROM Message`);
    return data.rows;
  } catch (err) {
    console.error(err.stack);
  }
}

io.on("disconnect", (socket) => {
  console.log(`user disconnect: ${socket.id}`);
});

export default server;
