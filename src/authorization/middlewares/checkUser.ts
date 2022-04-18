import { NextFunction, Request, Response } from "express";
import { UserAlreadyExistException } from "../../error-handnling/exceptions";
import { UserService } from "../../services/user.service";

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (await UserService.isUserExists(email))
    return next(new UserAlreadyExistException());

  return next();
};
