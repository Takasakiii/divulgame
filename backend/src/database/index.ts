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

export interface ErrorReponse {
  error: string;
}
