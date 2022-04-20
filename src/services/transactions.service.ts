import { AppDataSource } from "../config/db/appDataSource";
import { User } from "../entities/user.entity";
import { NoMoneyException } from "../error-handnling/transactions.exceptions";
import { TransactionRepository } from "../repositories/transaction.repository";
import { UserRepostirory } from "../repositories/user.repository";
import { UserService } from "./user.service";

export class TransactionsSerivce {
  static async increaceSum(id: number, value: number) {
    const result = await UserRepostirory.createQueryBuilder()
      .update()
      .set({
        sum: () => `sum + ${value}`,
      })
      .where("id = :id", { id })
      .returning(["firstName", "sum"])
      .execute();

    return result.raw;
  }

  static async decreaseSum(id: number, value: number) {
    const result = await UserRepostirory.createQueryBuilder()
      .update()
      .set({
        sum: () => `sum - ${value}`,
      })
      .where("id = :id", { id })
      .returning(["firstName", "sum"])
      .execute();

    return result.raw;
  }

  //TODO add logging in file / console / database transactions table
  static async sendMoney(fromUserId: number, toUserId: number, sum: number) {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(User)
        .set({ sum: () => `sum - ${sum}` })
        .where("id = :id", { id: fromUserId })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .update(User)
        .set({ sum: () => `sum + ${sum}` })
        .where("id = :id", { id: toUserId })
        .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
      throw new NoMoneyException();
    } finally {
      await queryRunner.release();
    }
  }
}
