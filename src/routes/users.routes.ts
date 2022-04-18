import { Request, Response, Router } from "express";
import { nextTick } from "process";
import { LocalAuthGuard } from "../authorization/guards/local.guard";
import { checkUser } from "../authorization/middlewares/checkUser";
import { validateUserDto } from "../authorization/middlewares/validateUserDto";
import { UserController } from "../controllers/user.controller";

export const usersRouter = Router();

export const validateLoginDto = (
  req: Request & { body: any },
  res: Response,
  next
) => {
  const { email, password } = req.body;

  const errorMessages: string[] = [];

  if (!email) errorMessages.push("Email should be provided");
  if (!password) errorMessages.push("Password should be provided");

  if (errorMessages.length !== 0)
    return next(new Error(JSON.stringify(errorMessages)));

  return next();
};

usersRouter
  .route("/signin")
  .post(checkUser, validateUserDto, UserController.registrate);

usersRouter
  .route("/login")
  .post(validateLoginDto, LocalAuthGuard, UserController.login);
