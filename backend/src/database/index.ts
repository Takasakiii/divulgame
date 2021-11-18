export class InvalidArgsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidArgsError";
  }
}

export class InvalidEnvConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidEnvConfigError";
  }
}

export class InconstantDataError extends InvalidArgsError {
  constructor(message: string) {
    super(message);
    this.name = "InconstantDataError";
  }
}

export interface ErrorReponse {
  error: string;
}

export class InvalidFileTypeError extends InvalidArgsError {
  constructor(message: string) {
    super(message);
    this.name = "InvalidFileTypeError";
  }
}

export class NotFoundError extends InvalidArgsError {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends InvalidArgsError {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}
