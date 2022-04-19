import { AppDataSource } from "../config/db/appDataSource";
import { NoMoneyException } from "../error-handnling/transactions.exceptions";
import { TransactionRepository } from "../repositories/transaction.repository";
import { UserRepostirory } from "../repositories/user.repository";

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
      await this.decreaseSum(fromUserId, sum);
      await this.increaceSum(toUserId, sum);
      await queryRunner.commitTransaction();
    } catch {
      queryRunner.rollbackTransaction();
      throw new NoMoneyException();
    }
  }
}
