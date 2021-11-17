import Joi from "joi";
import { buildSchemaValidator } from "../helpers/validator.js";

const orderItemSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().integer().min(1).required(),
    quantidade: Joi.number().integer().min(1).required(),
  })
);

export const validateOrderItems = buildSchemaValidator(orderItemSchema);
