import type { Request, Response } from "express";
import app from "../server/index";

/**
 * Shared Vercel adapter for the Express API.
 * Explicit endpoint functions use this adapter so critical auth routes do not
 * depend only on catch-all function discovery.
 */
export function handleExpress(request: Request, response: Response, routePath?: string) {
  if (routePath) {
    request.url = routePath;
  }
  return app(request, response);
}
