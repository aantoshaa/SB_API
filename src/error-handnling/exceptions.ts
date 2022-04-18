export abstract class CommonException extends Error {
  public status: number = 500;
  constructor(message = "Unknown server errorr") {
    super(message);
  }
}

export class UnauthorizaedException extends CommonException {
  constructor() {
    super("Such user doesn't exists");
    this.status = 401;
  }
}

export class ForbiddenException extends CommonException {
  constructor() {
    super("This resouse is forbidden for you");
    this.status = 403;
  }
}

export class NotFoundError extends CommonException {
  constructor() {
    super("Such user doesn't exists");
    this.status = 404;
  }
}

export class UserAlreadyExistException extends CommonException {
  constructor() {
    super("Such user has already exists");
  }
}

export class ValidationException extends CommonException {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
