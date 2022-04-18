import { Router } from "express";
import { checkUser } from "../authorization/middlewares/checkUser";
import { validateUserDto } from "../authorization/middlewares/validateUserDto";
import { UserController } from "../controllers/user.controller";

export const usersRouter = Router();

usersRouter
  .route("/signin")
  .post(checkUser, validateUserDto, UserController.registrate);
