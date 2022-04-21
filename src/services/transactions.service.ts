import { AppDataSource } from "../config/db/appDataSource";
import { User } from "../entities/user.entity";
import { NoMoneyException } from "../error-handnling/transactions.exceptions";
import { UserRepostirory } from "../repositories/user.repository";

export class TransactionsSerivce {
<<<<<<< HEAD
  static async increaceSum(id: number, value: number) {
=======
  private static async transactionsLogging() {
    console.log("abc");
  }

  private static async commonSumChanging(
    id: number,
    sum: number,
    operation: Operation
  ) {
>>>>>>> optimization/remove-duplicated-code
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
  static async sendMoney(fromUser: User, toUser: User, sum: number) {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      fromUser.sum -= Number(sum);
      await queryRunner.manager.save(fromUser);
      toUser.sum += Number(sum);
      await queryRunner.manager.save(toUser);
      await queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
      throw new NoMoneyException();
    } finally {
      await queryRunner.release();
    }
  }
}
