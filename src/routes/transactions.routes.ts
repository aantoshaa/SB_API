import { NextFunction, Request, Response, Router } from "express";
import { JwtAuthGuard } from "../authorization/guards/jwt.auth.guard";
import { TransactionsController } from "../controllers/transactions.controller";
import { UserService } from "../services/user.service";
import { sumValidation } from "../validation/sum.validator";

export const transactionsRouter = Router();

transactionsRouter
  .route("/plus")
  .post(
    sumValidation,
    JwtAuthGuard,
    TransactionsController.accountReplenishment
  );

transactionsRouter
  .route("/minus")
  .post(sumValidation, JwtAuthGuard, TransactionsController.cashWithdrawal);

const checkIfUsersExists = async (
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

transactionsRouter
  .route("/send")
  .post(JwtAuthGuard, checkIfUsersExists, TransactionsController.sendMoney);
