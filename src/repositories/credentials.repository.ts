import { AppDataSource } from "../config/db/appDataSource";
import { Credentials } from "../entities/credentials.entity";

export const CredentialsRepository = AppDataSource.getRepository(Credentials);
