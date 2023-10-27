import server from "./socket.js";
import { initDB } from "./db.js";

const PORT = process.env.PORT ?? 3000;

const Start = async () => {
  try {
    /* inicializamos la db */
    await initDB();
    /* iniciamos el servidor */
    server.listen(PORT, () => console.log(`server listen on port: ${PORT}`));
  } catch (err) {
    /* registamos el error en consola y detenemos la ejecución */
    console.error("Error al iniciar servidor:", err.stack);
    process.exit(1);
  }
}

Start();
