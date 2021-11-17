import Joi from "joi";
import { buildSchemaValidator } from "../helpers/validator.js";

const productFields = {
  nome: Joi.string().max(255),
  preco: Joi.number().min(0),
  estoque: Joi.number().min(0).integer(),
};

const setAsRequired = (obj) => {
  const newObj = {};
  const keys = Object.keys(obj);

  for (const key of keys) {
    newObj[key] = obj[key].required();
  }
  return newObj;
};

let productFieldsRequired = setAsRequired(productFields);

const createProductSchema = Joi.object(productFieldsRequired);

const updateProductSchema = Joi.object(productFields);

export const validateCreateProduct = buildSchemaValidator(createProductSchema);
export const validateUpdateProduct = buildSchemaValidator(updateProductSchema);
