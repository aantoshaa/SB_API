import { NextFunction, Response } from "express";
import { ValidationException } from "../../error-handnling/authorization-exceptions";
import { RegistrationRequest } from "../../shared/interfaces/registration-request";

export const validateUserDto = (
  req: RegistrationRequest,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;

  const errorMessages: string[] = [];

  if (!firstName) errorMessages.push("Firstname should be provided");

  if (!lastName) errorMessages.push("Lastname should be provided");

  if (!email) errorMessages.push("Email should be provided");

  if (!/^([0-9a-zA-z_\.]+)@([a-z]+)\.([a-z]+)$/.test(email))
    errorMessages.push("Email should be type of email");

  if (!password) {
    errorMessages.push("Password should be provided");
  }

  if (password && password.length < 8)
    errorMessages.push("Passwords length should be > 8");

  if (password && password === password.toLowerCase())
    errorMessages.push("Password must have at least 1 capital letter");

  if (errorMessages.length !== 0)
    return next(new ValidationException(JSON.stringify(errorMessages)));

  return next();
};
