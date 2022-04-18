import { DataSource } from "typeorm";
import { Credentials } from "../../entities/credentials.entity";
import { UserRole } from "../../entities/role.entity";
import { Transaction } from "../../entities/transaction.entity";
import { User } from "../../entities/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "3462538",
  database: "bank-storage",
  entities: [User, Credentials, Transaction, UserRole],
  synchronize: true,
});
