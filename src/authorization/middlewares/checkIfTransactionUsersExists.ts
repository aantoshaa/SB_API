import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/user.entity";
import { UserService } from "../../services/user.service";

export interface TransactionDto {
  userFrom: User;
  userTo: User;
  sum: number;
}

export const checkIfUsersExists = async (
  req: Request & { user: any; transactionDto: TransactionDto },
  res: Response,
  next: NextFunction
) => {
  const fromUserId = req.user.id;
  const { toUserId, sum } = req.body;

  const [userFrom, userTo] = await Promise.all([
    UserService.getUserById(fromUserId),
    UserService.getUserById(toUserId),
  ]);

  if (!userFrom || !userTo) return next(new Error("non existen users"));

  if (userFrom.id === userTo.id)
    return next(new Error("Can't send money to yourself"));

  req.transactionDto = {
    userFrom,
    userTo,
    sum,
  };

  return next();
};
