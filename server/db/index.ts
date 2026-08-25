import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./persistentSchema";

const connectionString = process.env.DATABASE_URL?.trim();

const client = connectionString
  ? postgres(connectionString, {
      max: Number(process.env.DB_POOL_MAX ?? 5),
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
    })
  : null;

function createUnavailableDb(): ReturnType<typeof drizzle<typeof schema>> {
  return new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
    get() {
      throw new Error("Database is not configured in the server environment");
    },
  });
}

export const db = client ? drizzle(client, { schema }) : createUnavailableDb();
export const dbClient = client;

export async function verifyDatabaseConnection() {
  if (!client) throw new Error("DATABASE_URL must be configured in the server environment");
  const result = await client`select current_database() as database_name, now() as server_time`;
  return result[0];
}
