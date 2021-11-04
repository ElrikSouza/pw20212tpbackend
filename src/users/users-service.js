import { CryptService } from "../crypt/crypt.js";
import { BadRequest, Unauthenticated } from "../errors/errors.js";
import { JwtService } from "../jwt/jwt-service.js";
import { RolesService } from "../roles/role-service.js";
import { Users } from "./users.model.js";

const signUp = async (user) => {
  const hashedPassword = await CryptService.hashPassword(user.senha);
  const userRoleId = await RolesService.getUserRoleId();

  await Users.create({
    tipoUsuarioId: userRoleId,
    senha: hashedPassword,
    nome: user.nome,
    email: user.email,
  });
};

const signIn = async (user) => {
  if (typeof user.senha !== "string") {
    throw new BadRequest("Password not found");
  }

  const userRegister = await Users.findOne({
    where: { email: user.email },
    attributes: ["id", "senha"],
  });

  const doPasswordsMatch = await CryptService.comparePassword(
    user.senha,
    userRegister.senha
  );

  if (!doPasswordsMatch) {
    throw new Unauthenticated("Senha errada.");
  }

  const token = JwtService.createToken(userRegister.id);

  return token;
};

export const UsersService = {
  signUp,
  signIn,
};
