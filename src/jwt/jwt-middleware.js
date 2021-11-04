import { wrapMiddlewareWithErrorHandling } from "../errors/error-handling.js";
import { BadRequest } from "../errors/errors.js";
import { JwtService } from "./jwt-service.js";

const splitAuthenticationHeader = (header) => {
  const splitHeader = header.split(" ");

  if (splitHeader.length !== 2) {
    throw new BadRequest("Invalid authentication header");
  }

  return splitHeader[1];
};

const extractJwtFromBearerToken = (req) => {
  const authenticationHeader = req.headers.authentication;

  if (typeof authenticationHeader !== "string") {
    throw new BadRequest("Authentication header is undefined");
  }

  const token = splitAuthenticationHeader(authenticationHeader);

  return token;
};

export const jwtMiddleware = wrapMiddlewareWithErrorHandling(
  async (req, _, next) => {
    const token = extractJwtFromBearerToken(req);
    const userId = JwtService.getUserIdFromToken(token);

    req.user_id = userId;

    next();
  }
);
