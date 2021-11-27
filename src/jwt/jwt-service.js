import jwt from "jsonwebtoken";
import { Unauthenticated } from "../errors/errors.js";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (typeof secret !== "string") {
    console.error("Critical error: JWT_SECRET is undefined.");
    process.exit(1);
  }

  return secret;
};

const secret = getJwtSecret();

const createToken = (user_id) => {
  return jwt.sign({ user_id }, secret, { expiresIn: "7d" });
};

const getUserIdFromToken = (token) => {
  try {
    const payload = jwt.verify(token, secret);

    return payload.user_id;
  } catch (_) {
    throw new Unauthenticated("Invalid authorization token");
  }
};

export const JwtService = { createToken, getUserIdFromToken };
