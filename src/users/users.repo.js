import { NotFound } from "../errors/errors.js";
import { Users } from "./users.model.js";

const getUserCredentials = async (email) => {
  const credentials = await Users.findOne({
    where: { email },
    attributes: ["id", "senha"],
  });

  if (!credentials) {
    throw new NotFound("Usuario nao encontrado");
  }

  return {
    email,
    id: credentials.id,
    senha: credentials.senha,
  };
};

const saveUser = async (user) => {
  await Users.create({
    tipoUsuarioId: user.tipoUsuarioId,
    senha: user.senha,
    nome: user.nome,
    email: user.email,
  });
};

export const UsersRepo = {
  getUserCredentials,
  saveUser,
};
