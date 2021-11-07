import { CryptService } from "../crypt/crypt.js";
import { PermissionsService } from "../permissions/permissions-service.js";
import { RolesService } from "../roles/role-service.js";
import { UsersRepo } from "../users/users.repo.js";

const createCollaborator = async (collaborator, user_id) => {
  await PermissionsService.assertUserHasAdmPermissions(
    user_id,
    "Usuario precisar ser um colaborador para registrar outro colaborador."
  );

  const hashedPassword = await CryptService.hashPassword(collaborator.senha);
  const admRoleId = await RolesService.getAdmRoleId();

  await UsersRepo.saveUser({
    ...collaborator,
    senha: hashedPassword,
    tipoUsuarioId: admRoleId,
  });
};

export const CollaboratorsService = {
  createCollaborator,
};
