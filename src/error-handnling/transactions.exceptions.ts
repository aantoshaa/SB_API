import { CommonException } from "./exceptions";

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
