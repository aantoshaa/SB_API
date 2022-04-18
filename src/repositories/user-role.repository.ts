import { AppDataSource } from "../config/db/appDataSource";
import { UserRole } from "../entities/role.entity";

export const UsersRoleRepository = AppDataSource.getRepository(UserRole);
