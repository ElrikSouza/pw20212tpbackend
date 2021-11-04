import { ApiError } from "./api-error.js";

export class NotFound extends ApiError {
  constructor(message) {
    super(404, message);
  }
}

export class BadRequest extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

export class Unauthenticated extends ApiError {
  constructor(message) {
    super(401, message);
  }
}

export class Forbidden extends ApiError {
  constructor(message) {
    super(403, message);
  }
}
