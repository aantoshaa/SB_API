import { NextFunction, Request, Response } from "express";
import { CommonException } from "./authorization-exceptions";
import { logger } from "../logger/pino-logger";

export const commonErrorHandler = (
  err: CommonException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.warn(err.message);

  res.status(err.status || 500).send({
    message: "Ooops... Something went wrong",
    reason: err.message,
  });
};
