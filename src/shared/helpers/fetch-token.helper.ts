import { Request } from "express";

export const getTokenFromHeader = (req: Request): string | null =>
  req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
