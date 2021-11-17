import { wrapWithErrorHandling } from "../errors/error-handling.js";
import { ProductsService } from "./products-service.js";

const getProductImg = (req) => {
  if (req.file == null) {
    return { buffer: null };
  }

  return {
    buffer: req.file.buffer,
    mimeType: req.file.mimetype,
  };
};

const createProduct = wrapWithErrorHandling(async (req, res) => {
  const { body: product, user_id } = req;
  const product_image = getProductImg(req);

  await ProductsService.createProduct(product, product_image, user_id);

  return res.status(201).send({ message: "Product has been created." });
});

const deleteProduct = wrapWithErrorHandling(async (req, res) => {
  const { user_id } = req;
  const { id: product_id } = req.params;

  await ProductsService.deleteProduct(product_id, user_id);

  return res.status(200).send({ message: "Product has been deleted" });
});

const getOneProduct = wrapWithErrorHandling(async (req, res) => {
  const { id: product_id } = req.params;

  const product = await ProductsService.getOneProduct(product_id);

  return res.status(200).send(product);
});

const getAllProducts = wrapWithErrorHandling(async (req, res) => {
  const { query } = req;
  const products = await ProductsService.getAllProducts(query);

  return res.status(200).send(products);
});

const editProduct = wrapWithErrorHandling(async (req, res) => {
  const { id: product_id } = req.params;
  const { body: changes, user_id } = req;
  const product_image = getProductImg(req);

  await ProductsService.editProduct(
    product_id,
    user_id,
    changes,
    product_image
  );

  return res.status(200).send({ message: "Product has been edited" });
});

export const ProductsController = {
  createProduct,
  deleteProduct,
  getOneProduct,
  getAllProducts,
  editProduct,
};
