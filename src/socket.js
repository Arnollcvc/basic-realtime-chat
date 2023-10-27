import { io, server } from "./server.js";
import { getClient as client } from "./db.js";

import { v4 as uuid } from "uuid";

io.on("connection", async (socket) => {
  console.log(`a user connected: ${socket.id}`);
  /* envia un array con todos los menajes previos */
  await prevMsgs(socket);
  /* evento para registrar los mensajes */ 
  socket.on("newMsg", async (msg) => {
    /* si el contenido del mensaje es mejor o igual a 0 no se ejecuta el resto */
    if (msg.length <= 0) return;
    const id = uuid();
    let data = { id, msg };
    /* envia el nuevo mensaje a los que esten conectados */
    socket.broadcast.emit("newMsg", data);
    /* actualiza la lista de mensajes del usuario */
    socket.emit("updateList", data);
    /* guarda el mensajea recibido */
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
  
async function prevMsgs(socket) {
  try {
    let data = await client().execute(`SELECT * FROM Message`);
    if (data.row <= 0) return; 
    socket.emit("loadPrev", data.row);
  } catch (err) {
    console.error(err.stack);
  }
}

io.on("disconnect", (socket) => {
  console.log(`user disconnect: ${socket.id}`);
});

export default server;
