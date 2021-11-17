import Joi from "joi";
import { ValidationError } from "../errors/errors.js";

export const buildSchemaValidator =
  (schema, options = { allowUnknown: true, stripUnknown: true }) =>
  async (value) => {
    try {
      const result = await Joi.attempt(value, schema, options);
      return result;
    } catch (error) {
      throw new ValidationError(error.message);
    }
  };
