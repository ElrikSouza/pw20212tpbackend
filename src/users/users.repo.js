import { NotFound, ValidationError } from "../errors/errors.js";
import { Roles } from "../roles/role.model.js";
import { Users } from "./users.model.js";
import Sequelize from "sequelize";

const getUserCredentials = async (email) => {
  const credentials = await Users.findOne({
    where: { email },
    attributes: ["id", "senha"],
    include: [
      {
        model: Roles,
        attributes: ["rotulo"],
      },
    ],
  });

  if (!credentials) {
    throw new NotFound("Usuario nao encontrado");
  }

  return {
    email,
    id: credentials.id,
    senha: credentials.senha,
    role: credentials.TipoUsuario.rotulo,
  };
};

const saveUser = async (user) => {
  try {
    await Users.create({
      tipoUsuarioId: user.tipoUsuarioId,
      senha: user.senha,
      nome: user.nome,
      email: user.email,
    });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      throw new ValidationError("Email ja em uso");
    }
    throw error;
  }
};

export const UsersRepo = {
  getUserCredentials,
  saveUser,
};
