import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

import { registerAccessRoutes } from "./auth/routes";
import { registerAdminRoutes } from "./admin/routes";
import { registerCatalogRoutes } from "./content/catalogRoutes";
import { registerContentSyncRoutes } from "./content/syncRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * MONSTER IPTV server application.
 *
 * The Express app is exported for Vercel's serverless adapter and is also
 * started by the local Node entrypoint when this file is executed directly.
 */
export const app = express();

app.use(express.json({ limit: "32kb" }));

const staticPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

registerAccessRoutes(app);
registerAdminRoutes(app);
registerContentSyncRoutes(app);
registerCatalogRoutes(app);

// Client-side routing is only used for non-API requests.
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;

if (!process.env.VERCEL) {
  const port = Number(process.env.PORT ?? 3000);
  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
