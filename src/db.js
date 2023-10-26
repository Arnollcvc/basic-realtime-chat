import { createClient } from "@libsql/client";

let client = null;

export const connectDB = async () => {
  try {
    client = createClient({
      url: process.env.TURSO_URI,
      authToken: process.env.TURSO_TOKEN
    });
    await client.sync();
    return client;
  } catch (err) {
    console.error("Error al tratar de conectar con la db");
    throw err;
  }
}

export const getClient = () => client;

export const initDB = async () => {
  try {
    await connectDB();
    await client.execute(`CREATE TABLE IF NOT EXISTS Message (id TEXT PRIMARY KEY, msg TEXT )`);
    console.log("Conectado a la DB");
  } catch (err) {
    console.error("Error al inicializar la db:", err);
    throw err;
  }
}

