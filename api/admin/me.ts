import type { Request, Response } from "express";
import { handleExpress } from "../_express";

export default function handler(request: Request, response: Response) {
  return handleExpress(request, response, "/api/admin/me");
}
