import { Request, Response, NextFunction } from "express";
import { UserService } from "../../services/user.service";

export const checkIfUsersExists = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  const fromUserId = req.user.id;
  const { toUserId, sum } = req.body;

  return (
    await Promise.all([
      UserService.isUserExistById(fromUserId),
      UserService.isUserExistById(toUserId),
    ])
  ).some((user) => user === false)
    ? next(new Error("No such users"))
    : next();
};
