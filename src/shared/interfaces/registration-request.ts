import { Request } from "express";
import { CreateUserDto } from "./create-user.dto";

export interface RegistrationRequest extends Request {
  body: CreateUserDto;
}
