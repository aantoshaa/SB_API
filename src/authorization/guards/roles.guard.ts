import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  ForbiddenException,
  UnauthorizaedException,
} from "../../error-handnling/exceptions";
import { Role } from "../../shared/enums/admin.enum";
import { getTokenFromHeader } from "../../shared/helpers/fetch-token.helper";

export const RolesGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req); // token that contains user id and his roles

  if (!token) next(new UnauthorizaedException());

  const payload: any = jwt.verify(token, process.env.TOKEN_KEY_WORD);

  const { roles }: { roles: Role[] } = payload;

  return roles.includes(Role.ADMIN) ? next() : next(new ForbiddenException());
};
