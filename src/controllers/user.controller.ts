import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RegistrationRequest } from "../shared/interfaces/registration-request";

export class UserController {
  static async registrate(
    req: RegistrationRequest,
    res: Response,
    next: NextFunction
  ) {
    const { firstName, lastName, email, password } = req.body;

    await UserService.createUser({
      firstName,
      lastName,
      email,
      password,
    }).catch(next);

    return { firstName, lastName };
  }

  static async login(
    req: Request & { user: any }, // improve that
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;

      const tokenDto = UserService.loginUser(id);

      res.send(tokenDto);
    } catch (err) {
      next(err);
    }
  }
}
