import { AppDataSource } from "../config/db/appDataSource";
import { User } from "../entities/user.entity";

export const UserRepostirory = AppDataSource.getRepository(User);
