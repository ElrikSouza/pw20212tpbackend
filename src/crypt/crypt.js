import { compare, hash } from "bcrypt";

const hashPassword = async (password) => {
  return hash(password, 13);
};

const comparePassword = async (password, hash) => {
  return compare(password, hash);
};

export const CryptService = {
  hashPassword,
  comparePassword,
};
