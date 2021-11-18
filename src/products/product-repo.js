import { v4 } from "uuid";
import { NotFound } from "../errors/errors.js";
import { ImagesService } from "../image-upload/images-service.js";
import { Products } from "./product.model.js";
import Sequelize from "sequelize";

const createProduct = async (product, product_img) => {
  let img_filename = null;

  if (product_img.buffer != null) {
    img_filename = await ImagesService.saveImage(
      product_img.buffer,
      product_img.mimeType,
      v4()
    );
  }

  try {
    await Products.create({
      nome: product.nome,
      preco: product.preco,
      estoque: product.estoque,
      img_filename,
    });
  } catch (err) {
    await ImagesService.deleteImage(img_filename);
    throw err;
  }
};

const getOneProductQuery = (productId, attributes) => {
  const query = { where: { id: productId } };

  if (attributes) {
    query["attributes"] = attributes;
  }

  return query;
};

const getOneProduct = async (productId, attributes) => {
  const query = getOneProductQuery(productId, attributes);

  const result = await Products.findOne(query);

  if (result == null) {
    throw new NotFound("Produto nao encontrado");
  }

  return result;
};

const deleteOneProduct = async (productId) => {
  const product = await getOneProduct(productId, ["id"]);

  await product.destroy();

  if (product.img_filename) {
    ImagesService.deleteImage(product.img_filename);
  }
};

const editableFieldsProduct = ["nome", "preco", "estoque", "img_filename"];

const mergeProduct = (original, changes) => {
  for (const field of editableFieldsProduct) {
    if (changes[field]) {
      original[field] = changes[field];
    }
  }
};

const updateOneProduct = async (productId, product_img, changes) => {
  const product = await getOneProduct(productId);

  if (product_img.buffer != null) {
    const { img_filename } = await getOneProduct(productId, ["img_filename"]);
    const newFilename = await ImagesService.replaceImage(
      img_filename,
      product_img.buffer,
      product_img.mimeType,
      v4()
    );

    changes.img_filename = newFilename;
  }

  mergeProduct(product, changes);
  await product.save();
};

const getAllProductsQueryParams = (query) => {
  const queryParams = { limit: 10 };
  if (query.nome) {
    queryParams["where"] = { nome: { [Sequelize.Op.like]: `%${query.nome}%` } };
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
  const params = getAllProductsQueryParams(query);
  const { count, rows: products } = await Products.findAndCountAll(params);

  return { products, count };
};

export const ProductsRepo = {
  createProduct,
  getOneProduct,
  deleteOneProduct,
  updateOneProduct,
  getAllProducts,
};
