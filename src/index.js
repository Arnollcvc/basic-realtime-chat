import { server } from "./server.js";
import { createClient } from "@libsql/client/";

const PORT = process.env.PORT ?? 3000;

export const client = createClient({
  authToken: process.env.TURSO_TOKEN,
  url: process.env.TURSO_URL
});

const Start = async () => {
  await client.sync();
  server.listen(PORT, () => console.log(`server listen on port: ${PORT}`));
}

Start();
