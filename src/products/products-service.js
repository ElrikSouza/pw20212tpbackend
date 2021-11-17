import { Forbidden } from "../errors/errors.js";
import { validateIntId } from "../helpers/id-validator.js";
import { PermissionsService } from "../permissions/permissions-service.js";
import { ProductsRepo } from "./product-repo.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "./products-validator.js";

const checkPermissions = async (user_id, message) => {
  const isUserAdm = await PermissionsService.isUserAdm(user_id);

  if (!isUserAdm) {
    throw new Forbidden(message);
  }
};

const createProduct = async (product, product_image, user_id) => {
  const validatedProduct = await validateCreateProduct(product);
  await checkPermissions(user_id, "This user cannot create products");

  await ProductsRepo.createProduct(validatedProduct, product_image);
};

const deleteProduct = async (product_id, user_id) => {
  await validateIntId(product_id);
  await checkPermissions(user_id, "This user cannot delete products");
  await ProductsRepo.deleteOneProduct(product_id);
};

const getOneProduct = async (product_id) => {
  await validateIntId(product_id);
  const product = await ProductsRepo.getOneProduct(product_id);

  return { product };
};

const getAllProducts = ProductsRepo.getAllProducts;

const editProduct = async (product_id, user_id, changes, product_img) => {
  await validateIntId(product_id);
  const validatedChanges = await validateUpdateProduct(changes);
  await checkPermissions(user_id, "This user cannot edit products");

  await ProductsRepo.updateOneProduct(
    product_id,
    product_img,
    validatedChanges
  );
};

export const ProductsService = {
  createProduct,
  deleteProduct,
  getOneProduct,
  getAllProducts,
  editProduct,
};
