import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/user.service";

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (await UserService.isUserExists(email))
    next(new Error("Such user has already exists"));

  next();
};
