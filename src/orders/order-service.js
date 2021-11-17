import { validateIntId } from "../helpers/id-validator.js";
import { OrdersRepo } from "./order-repo.js";
import { validateOrderItems } from "./orders-validator.js";

const createOrder = async ({ products, userId, addressId }) => {
  await validateIntId(addressId);
  await validateOrderItems(products);
  await OrdersRepo.createOrder({ products, userId, addressId });
};

export const OrdersService = {
  createOrder,
};
