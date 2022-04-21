import { AppDataSource } from "../config/db/appDataSource";
import { User } from "../entities/user.entity";
import { NoMoneyException } from "../error-handnling/transactions.exceptions";
import { UserRepostirory } from "../repositories/user.repository";
import { Operation } from "../shared/enums/operation.enums";

//TODO TEST THIS
export class TransactionsSerivce {
  private static async transactionsLogging() {
    console.log("abc");
  }

  private static async commonSumChanging(
    id: number,
    sum: number,
    operation: Operation
  ) {
    const result = await UserRepostirory.createQueryBuilder()
      .update()
      .set({
        sum: () => `sum ${operation} ${sum}`,
      })
      .where("id = :id", { id })
      .returning(["firstName", "sum"])
      .execute();

    return result.raw;
  }

  static async increaceSum(id: number, sum: number) {
    return this.commonSumChanging(id, sum, Operation.INCREASE);
  }

  static async decreaseSum(id: number, sum: number) {
    return this.commonSumChanging(id, sum, Operation.DECREASE);
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
