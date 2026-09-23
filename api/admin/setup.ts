import type { Request, Response } from "express";
import { handleExpress } from "../_express.js";

export default function handler(
  request: Request,
  response: Response,
) {
  return handleExpress(
    request,
    response,
    "/api/admin/setup",
  );
}