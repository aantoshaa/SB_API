import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../error-handnling/exceptions";
import { AdminService } from "../services/admin.service";

import { UserService } from "../services/user.service";

export class AdminController {
  static async getAllTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transactions = await AdminService.getAllTransactions();
      res.send(transactions);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(+id);
    } catch (err) {
      return next(err);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(+id);
      if (!user) throw new NotFoundError();
      res.send(user);
    } catch (err) {
      return next(err);
    }
  }
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.send(users);
    } catch (err) {
      return next(err);
    }
  }
}
