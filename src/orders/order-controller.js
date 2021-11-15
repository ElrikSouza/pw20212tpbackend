import { wrapWithErrorHandling } from "../errors/error-handling.js";
import { OrdersService } from "./order-service.js";

const createOrder = wrapWithErrorHandling(async (req, res) => {
  const { body, user_id } = req;

  await OrdersService.createOrder({
    products: body.products,
    userId: user_id,
    addressId: body.addressId,
  });

  return res.status(201).send({ msg: "Compra finalizada." });
});

export const OrdersController = {
  createOrder,
};
