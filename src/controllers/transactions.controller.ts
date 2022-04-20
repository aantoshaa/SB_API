import { NextFunction, Request, Response } from "express";
import { TransactionDto } from "../authorization/middlewares/checkIfTransactionUsersExists";
import { NoMoneyException } from "../error-handnling/transactions.exceptions";
import { TransactionsSerivce } from "../services/transactions.service";

export class TransactionsController {
  static async sendMoney(
    req: Request & { transactionDto: TransactionDto },
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userFrom, userTo, sum } = req.transactionDto;
      await TransactionsSerivce.sendMoney(userFrom, userTo, sum);

      res.send("Successfully");
    } catch (err) {
      next(err);
    }
  }

  static async accountReplenishment(
    req: Request & { user: any },
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { sum } = req.body;
      const result = await TransactionsSerivce.increaceSum(id, sum);
      res.send(result);
    } catch {
      next(new NoMoneyException());
    }
  }

  static async cashWithdrawal(
    req: Request & { user: any },
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { sum } = req.body;
      const result = await TransactionsSerivce.decreaseSum(id, sum);
      res.send(result);
    } catch {
      next(new NoMoneyException());
    }
  }
}
