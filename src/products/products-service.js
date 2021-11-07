import { Forbidden, NotFound } from "../errors/errors.js";
import { PermissionsService } from "../permissions/permissions-service.js";
import { Products } from "./product.model.js";

const checkPermissions = async (user_id, message) => {
  const isUserAdm = await PermissionsService.isUserAdm(user_id);

  if (!isUserAdm) {
    throw new Forbidden(message);
  }
};

const createProduct = async (product, user_id) => {
  await checkPermissions(user_id, "This user cannot create products");

  await Products.create({
    nome: product.nome,
    preco: product.preco,
    estoque: product.estoque,
  });
};

const deleteProduct = async (product_id, user_id) => {
  await checkPermissions(user_id, "This user cannot delete products");

  const product = await Products.findOne({
    where: { id: product_id },
    attributes: ["product_id"],
  });

  if (product === null) {
    throw new NotFound("Product not found.");
  }

  await product.destroy();
};

const getOneProduct = async (product_id) => {
  const product = await Products.findOne({ where: { id: product_id } });

  if (product === null) {
    throw new NotFound("Product not found.");
  }

  return { product };
};

// Sem paginacao ainda
const getAllProducts = async () => {
  const products = await Products.findAll();

  return { products };
};

const editableFieldsProduct = ["nome", "preco", "estoque"];

const mergeProduct = (original, changes) => {
  for (const field of editableFieldsProduct) {
    if (changes[field]) {
      original[field] = changes[field];
    }
  }
};

const editProduct = async (product_id, user_id, changes) => {
  await checkPermissions(user_id, "This user cannot edit products");

  const product = await Products.findOne({ where: { id: product_id } });

  if (product === null) {
    throw new NotFound("Product not found.");
  }

  mergeProduct(product, changes);

  await product.save();
};

export const ProductsService = {
  createProduct,
  deleteProduct,
  getOneProduct,
  getAllProducts,
  editProduct,
};