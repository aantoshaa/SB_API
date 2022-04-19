import { NextFunction, Request, Response } from "express";
import {
  IncorrectSumInputException,
  UndefinedSumException,
} from "../error-handnling/transactions.exceptions";

export const sumValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sum } = req.body;

  if (!sum) return next(new UndefinedSumException());
  else if (sum < 0) return next(new IncorrectSumInputException());

  return next();
};
