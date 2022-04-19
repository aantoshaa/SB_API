import { Router } from "express";
import { JwtAuthGuard } from "../authorization/guards/jwt.auth.guard";
import { TransactionsController } from "../controllers/transactions.controller";
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

transactionsRouter
  .route("/send")
  .post(JwtAuthGuard, TransactionsController.sendMoney);
