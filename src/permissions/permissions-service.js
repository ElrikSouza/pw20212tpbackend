import { Users } from "../users/users.model.js";
import { RolesService } from "../roles/role-service.js";
import { Forbidden } from "../errors/errors.js";

const isUserAdm = async (user_id) => {
  const { tipoUsuarioId } = await Users.findOne({
    where: { id: user_id },
    attributes: ["tipoUsuarioId"],
  });

  const admId = await RolesService.getAdmRoleId();

  return admId == tipoUsuarioId;
};

const assertUserHasAdmPermissions = async (user_id, message) => {
  const isUserAdmCheck = await isUserAdm(user_id);

  if (!isUserAdmCheck) {
    throw new Forbidden(message);
  }
};

export const PermissionsService = {
  isUserAdm,
  assertUserHasAdmPermissions,
};
