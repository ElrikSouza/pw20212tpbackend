import { Users } from "../users/users.model.js";
import { RolesService } from "../roles/role-service.js";

const isUserAdm = async (user_id) => {
  const { tipoUsuarioId } = await Users.findOne({
    where: { id: user_id },
    attributes: ["tipoUsuarioId"],
  });

  const admId = await RolesService.getAdmRoleId();

  return admId == tipoUsuarioId;
};

export const PermissionsService = {
  isUserAdm,
};
