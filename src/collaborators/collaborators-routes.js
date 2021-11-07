import { Router } from "express";
import { jwtMiddleware } from "../jwt/jwt-middleware.js";
import { CollaboratorsController } from "./collaborators-controller.js";

export const CollaboratorsModule = Router();

CollaboratorsModule.post(
  "/collaborators",
  jwtMiddleware,
  CollaboratorsController.createCollaborator
);
