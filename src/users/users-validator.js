import Joi from "joi";
import { buildSchemaValidator } from "../helpers/validator.js";

const commonFields = {
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).max(72).required(),
};

const loginSchema = Joi.object({
  ...commonFields,
});

export const validateLogin = buildSchemaValidator(loginSchema, {
  allowUnknown: true,
  stripUnknown: true,
});

const signUpSchema = Joi.object({
  ...commonFields,
  nome: Joi.string().min(2).max(100).required(),
});

export const validateSignUp = buildSchemaValidator(signUpSchema, {
  allowUnknown: true,
  stripUnknown: true,
});
