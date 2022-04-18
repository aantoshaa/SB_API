import { AppDataSource } from "../config/db/appDataSource";
import { Transaction } from "../entities/transaction.entity";

export const TransactionRepository = AppDataSource.getRepository(Transaction);
