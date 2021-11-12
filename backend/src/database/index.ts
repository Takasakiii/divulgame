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
