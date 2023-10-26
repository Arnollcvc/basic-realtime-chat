import server from "./socket.js";
import { initDB, getClient as client } from "./db.js";
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT ?? 3000;

const Start = async () => {
  try {
    /* inicializamos la db */
    await initDB();

    /* iniciamos el servidor */
    server.listen(PORT, () => console.log(`server listen on port: ${PORT}`));
  } catch (err) {
    console.error("Error al iniciar servidor:", err.stack);
    // process.exit(1);
  }
}

Start();
