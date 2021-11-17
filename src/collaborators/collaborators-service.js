import { CryptService } from "../crypt/crypt.js";
import { PermissionsService } from "../permissions/permissions-service.js";
import { RolesService } from "../roles/role-service.js";
import { validateSignUp } from "../users/users-validator.js";
import { UsersRepo } from "../users/users.repo.js";

const createCollaborator = async (collaborator, user_id) => {
  const validatedCollaborator = await validateSignUp(collaborator);

  await PermissionsService.assertUserHasAdmPermissions(
    user_id,
    "Usuario precisar ser um colaborador para registrar outro colaborador."
  );

  const hashedPassword = await CryptService.hashPassword(collaborator.senha);
  const admRoleId = await RolesService.getAdmRoleId();

  await UsersRepo.saveUser({
    ...validatedCollaborator,
    senha: hashedPassword,
    tipoUsuarioId: admRoleId,
  });
};

export const CollaboratorsService = {
  createCollaborator,
};
