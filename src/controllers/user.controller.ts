import { NextFunction, Response } from "express";
import { UserService } from "../services/user.service";
import { RegistrationRequest } from "../shared/interfaces/registration-request";

export class UserController {
  static async registrate(
    req: RegistrationRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const user = await UserService.createUser({
        firstName,
        lastName,
        email,
        password,
      });

      res.send(user);
    } catch (err) {
      next(err);
    }
  }
}
