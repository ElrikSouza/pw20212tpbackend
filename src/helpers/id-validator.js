import Joi from "joi";
import { buildSchemaValidator } from "./validator.js";

export const validateIntId = buildSchemaValidator(
  Joi.number().integer().min(1).required()
);
