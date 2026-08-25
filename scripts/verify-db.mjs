import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not configured");

const sql = postgres(url, { max: 1, connect_timeout: 10, idle_timeout: 5, prepare: false });
try {
  const rows = await sql`select current_database() as database_name, current_user as database_user`;
  console.log(JSON.stringify({ ok: true, database: rows[0]?.database_name, user: rows[0]?.database_user }));
} catch (error) {
  const safe = {
    ok: false,
    name: error?.name,
    code: error?.code,
    message: String(error?.message ?? "unknown error")
      .replace(/postgres(?:ql)?:\/\/[^\s]+/gi, "postgresql://[REDACTED]")
      .replace(/(password|passwd|pwd)=([^&\s]+)/gi, "$1=[REDACTED]"),
  };
  console.error(JSON.stringify(safe));
  process.exitCode = 1;
} finally {
  await sql.end({ timeout: 2 });
}
