import { Request, Response } from "express";
import { ValidationException } from "../../error-handnling/authorization-exceptions";
import { CreateUserDto } from "../../shared/interfaces/create-user.dto";

export const validateLoginDto = (
  req: Request & { body: Pick<CreateUserDto, "email" | "password"> },
  res: Response,
  next
) => {
  const { email, password } = req.body;

  const errorMessages: string[] = [];

  if (!email) errorMessages.push("Email should be provided");
  if (!password) errorMessages.push("Password should be provided");

  if (errorMessages.length !== 0)
    return next(new ValidationException(JSON.stringify(errorMessages)));

  return next();
};
