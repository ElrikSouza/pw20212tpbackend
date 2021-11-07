import { wrapWithErrorHandling } from "../errors/error-handling.js";
import { CollaboratorsService } from "./collaborators-service.js";

const createCollaborator = wrapWithErrorHandling(async (req, res) => {
  const { body: collaborator, user_id } = req;

  await CollaboratorsService.createCollaborator(collaborator, user_id);

  return res.status(201).send({ msg: "Colaborador foi registrado" });
});

export const CollaboratorsController = {
  createCollaborator,
};
