import { NextFunction, Request, Response, Router } from "express";
import { JwtAuthGuard } from "../authorization/guards/jwt.auth.guard";
import { LocalAuthGuard } from "../authorization/guards/local.guard";
import { checkUser } from "../authorization/middlewares/checkUser";
import { validateLoginDto } from "../authorization/middlewares/validateLoginDto";
import { validateUserDto } from "../authorization/middlewares/validateUserDto";
import { UserController } from "../controllers/user.controller";
import jwt from "jsonwebtoken";
import { ForbiddenException } from "../error-handnling/exceptions";

export const usersRouter = Router();

usersRouter
  .route("/signin")
  .post(validateUserDto, checkUser, UserController.registrate);

usersRouter
  .route("/login")
  .post(validateLoginDto, LocalAuthGuard, UserController.login);

const RolesGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload: any = jwt.verify(
    token,
    "sfkl32r239dk329jcc2u30uks032ural3r0ua2r4r94gt79gt924g1gmx0r7h23xrg49txg59g79203810y341m4y813y4mxg249g"
  );
  const { roles } = payload;

  return roles.includes("user") ? next() : next(new ForbiddenException());
};

usersRouter.route("/admin").get(RolesGuard, UserController.adminsOnlyResouse);
