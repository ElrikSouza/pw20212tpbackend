import Joi from "joi";
import { buildSchemaValidator } from "../helpers/validator.js";

const addressSchema = Joi.object({
  logradouro: Joi.string().max(255).required(),
  numero: Joi.number().min(0).required(),
  bairro: Joi.string().max(255).required(),
  cidade: Joi.string().max(255).required(),
  uf: Joi.string().length(2).required(),
  cep: Joi.string().min(8).max(9).required(),
});

export const validateAddress = buildSchemaValidator(addressSchema);
