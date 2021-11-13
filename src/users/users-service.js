import { CryptService } from "../crypt/crypt.js";
import { BadRequest, Unauthenticated } from "../errors/errors.js";
import { JwtService } from "../jwt/jwt-service.js";
import { RolesService } from "../roles/role-service.js";
import { UsersRepo } from "./users.repo.js";

const signUp = async (user) => {
  const hashedPassword = await CryptService.hashPassword(user.senha);
  const userRoleId = await RolesService.getUserRoleId();

  await UsersRepo.saveUser({
    ...user,
    senha: hashedPassword,
    tipoUsuarioId: userRoleId,
  });
};

const signIn = async (user) => {
  if (typeof user.senha !== "string") {
    throw new BadRequest("Password not found");
  }

  const userCredentials = await UsersRepo.getUserCredentials(user.email);

  const doPasswordsMatch = await CryptService.comparePassword(
    user.senha,
    userCredentials.senha
  );

  if (!doPasswordsMatch) {
    throw new Unauthenticated("Senha errada.");
  }

  const token = JwtService.createToken(userCredentials.id);

  return { token, role: userCredentials.role };
};

export const UsersService = {
  signUp,
  signIn,
};
