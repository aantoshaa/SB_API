import { NextFunction, Response } from "express";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegistrationRequest {
  body: CreateUserDto;
}

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
