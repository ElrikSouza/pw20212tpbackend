import { CryptService } from "../crypt/crypt.js";
import { Unauthenticated } from "../errors/errors.js";
import { JwtService } from "../jwt/jwt-service.js";
import { RolesService } from "../roles/role-service.js";
import { validateLogin, validateSignUp } from "./users-validator.js";
import { UsersRepo } from "./users.repo.js";

const signUp = async (user) => {
  const validatedUser = await validateSignUp(user);

  const hashedPassword = await CryptService.hashPassword(validatedUser.senha);
  const userRoleId = await RolesService.getUserRoleId();

  await UsersRepo.saveUser({
    ...validatedUser,
    senha: hashedPassword,
    tipoUsuarioId: userRoleId,
  });
};

const signIn = async (user) => {
  await validateLogin(user);

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
