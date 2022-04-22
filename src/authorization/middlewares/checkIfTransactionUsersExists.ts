import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/user.entity";
import { NotFoundError } from "../../error-handnling/authorization-exceptions";
import { CircularTransactionException } from "../../error-handnling/transactions-exceptions";
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

  if (!userFrom || !userTo) return next(new NotFoundError());

  if (userFrom.id === userTo.id)
    return next(new CircularTransactionException());

  req.transactionDto = {
    userFrom,
    userTo,
    sum,
  };

  return next();
};
