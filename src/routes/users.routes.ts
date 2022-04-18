import { Router } from "express";
import { checkUser } from "../authorization/middlewares/checkUser";
import { UserController } from "../controllers/user.controller";

export const usersRouter = Router();

usersRouter.route("/signin").post(checkUser, UserController.registrate);
