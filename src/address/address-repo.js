import { Address } from "./address-model.js";

const getAddresses = async (userId) => {
  const address = await Address.findAll({ where: { usuarioId: userId } });

  if (address == null) {
    return { address: [] };
  }

  return { address };
};

const createAddresss = async (address, userId) => {
  await Address.create({ ...address, usuarioId: userId });
};

export const AddressRepo = {
  getAddresses,
  createAddresss,
};
