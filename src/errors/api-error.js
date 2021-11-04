export class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}
