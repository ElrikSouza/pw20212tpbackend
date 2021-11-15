import { OrderItem } from "./order-item-model.js";
import { Order } from "./order-model.js";

const createOrder = async ({ products, userId, addressId }) => {
  const { id } = await Order.create({
    data: new Date(),
    usuarioId: userId,
    enderecoId: addressId,
  });

  const items = products.map((product) => ({
    compraId: id,
    produtoId: product.id,
    quantidade: product.quantidade,
  }));

  await OrderItem.bulkCreate(items);
};

export const OrdersRepo = {
  createOrder,
};
