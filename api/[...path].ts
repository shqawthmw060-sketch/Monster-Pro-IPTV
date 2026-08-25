import type { Request, Response } from "express";
import app from "../server/index";

/**
 * Vercel Node Serverless catch-all for every /api/* request.
 * The Express app remains the single source of truth for API routes.
 */
export default function handler(request: Request, response: Response) {
  return app(request, response);
}
