import { Transaction } from "../entities/transaction.entity";
import { TransactionRepository } from "../repositories/transaction.repository";

export class AdminService {
  static async getAllTransactions(): Promise<Transaction[]> {
    return TransactionRepository.find();
  }
}
