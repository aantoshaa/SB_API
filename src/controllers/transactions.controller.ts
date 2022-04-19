import { NextFunction, Request, Response } from "express";
import { NoMoneyException } from "../error-handnling/transactions.exceptions";
import { TransactionsSerivce } from "../services/transactions.service";

export class TransactionsController {
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
