import { Request, Response, Router } from "express";
import { nextTick } from "process";
import { LocalAuthGuard } from "../authorization/guards/local.guard";
import { checkUser } from "../authorization/middlewares/checkUser";
import { validateLoginDto } from "../authorization/middlewares/validateLoginDto";
import { validateUserDto } from "../authorization/middlewares/validateUserDto";
import { UserController } from "../controllers/user.controller";

export const usersRouter = Router();

usersRouter
  .route("/signin")
  .post(validateUserDto, checkUser, UserController.registrate);

usersRouter
  .route("/login")
  .post(validateLoginDto, LocalAuthGuard, UserController.login);
