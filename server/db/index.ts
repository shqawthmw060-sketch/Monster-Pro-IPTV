import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./persistentSchema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL must be configured in the server environment");
}

const client = postgres(connectionString, {
  max: Number(process.env.DB_POOL_MAX ?? 5),
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false,
});

export const db = drizzle(client, { schema });
export { client as dbClient };

export async function verifyDatabaseConnection() {
  const result = await client`select current_database() as database_name, now() as server_time`;
  return result[0];
}
