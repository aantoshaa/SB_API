import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Credentials } from "../../entities/credentials.entity";
import { UserRole } from "../../entities/role.entity";
import { Transaction } from "../../entities/transaction.entity";
import { User } from "../../entities/user.entity";

config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Credentials, Transaction, UserRole],
  synchronize: true,
});
