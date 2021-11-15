import { OrdersRepo } from "./order-repo.js";

const createOrder = async ({ products, userId, addressId }) => {
  await OrdersRepo.createOrder({ products, userId, addressId });
};

export const OrdersService = {
  createOrder,
};
