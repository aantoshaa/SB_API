import { CommonException } from "./authorization-exceptions";

export class NoMoneyException extends CommonException {
  constructor() {
    super("Insufficient funds on the account");
    this.status = 402;
  }
}

export class IncorrectSumInputException extends CommonException {
  constructor() {
    super("Sum should me great than 0");
    this.status = 402;
  }
}

export class UndefinedSumException extends CommonException {
  constructor() {
    super("Sum should be defined");
    this.status = 402;
  }
}

export class CircularTransactionException extends CommonException {
  constructor() {
    super("Cant't send money to yourself");
    this.status = 400;
  }
}
