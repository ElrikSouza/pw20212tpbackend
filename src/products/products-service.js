import { BadRequest, Forbidden, NotFound } from "../errors/errors.js";
import { PermissionsService } from "../permissions/permissions-service.js";
import { Products } from "./product.model.js";
import sequelize from "sequelize";
import { ImagesService } from "../image-upload/images-service.js";
import { v4 } from "uuid";
const { Op } = sequelize;

const checkPermissions = async (user_id, message) => {
  const isUserAdm = await PermissionsService.isUserAdm(user_id);

  if (!isUserAdm) {
    throw new Forbidden(message);
  }
};

const createProduct = async (product, product_image, user_id) => {
  await checkPermissions(user_id, "This user cannot create products");
  let img_path = null;

  if (product_image.buffer != null) {
    img_path = await ImagesService.saveImage(
      product_image.buffer,
      product_image.mimeType,
      v4()
    );
  }
  try {
    await Products.create({
      nome: product.nome,
      preco: product.preco,
      estoque: product.estoque,
      img_path,
    });
  } catch (err) {
    await ImagesService.deleteImage(img_path);
    throw err;
  }
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

const buildQueryParams = (query) => {
  const queryParams = { limit: 10 };
  if (query.nome) {
    queryParams["where"] = { nome: { [Op.like]: `%${query.nome}%` } };
  }
  if (query.page) {
    const page = Number.parseInt(query.page);
    if (page < 1) {
      throw new BadRequest("Page deve ser um inteiro positivo");
    }
    queryParams["offset"] = (page - 1) * 10;
  }
  return queryParams;
};

const getAllProducts = async (query) => {
  const params = buildQueryParams(query);
  const { count, rows: products } = await Products.findAndCountAll(params);

  return { products, count };
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
