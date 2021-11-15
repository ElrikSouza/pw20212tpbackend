import { Forbidden } from "../errors/errors.js";
import { PermissionsService } from "../permissions/permissions-service.js";
import { ProductsRepo } from "./product-repo.js";

const checkPermissions = async (user_id, message) => {
  const isUserAdm = await PermissionsService.isUserAdm(user_id);

  if (!isUserAdm) {
    throw new Forbidden(message);
  }
};

const createProduct = async (product, product_image, user_id) => {
  await checkPermissions(user_id, "This user cannot create products");

  await ProductsRepo.createProduct(
    {
      nome: product.nome,
      preco: product.preco,
      estoque: product.estoque,
    },
    product_image
  );
};

const deleteProduct = async (product_id, user_id) => {
  await checkPermissions(user_id, "This user cannot delete products");
  await ProductsRepo.deleteOneProduct(product_id);
};

const getOneProduct = async (product_id) => {
  const product = await ProductsRepo.getOneProduct(product_id);

  return { product };
};

const getAllProducts = ProductsRepo.getAllProducts;

const editProduct = async (product_id, user_id, changes, product_img) => {
  await checkPermissions(user_id, "This user cannot edit products");

  await ProductsRepo.updateOneProduct(product_id, product_img, changes);
};

export const ProductsService = {
  createProduct,
  deleteProduct,
  getOneProduct,
  getAllProducts,
  editProduct,
};
