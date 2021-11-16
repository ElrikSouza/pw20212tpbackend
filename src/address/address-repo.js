import { Address } from "./address-model.js";

const getAddresses = async (userId) => {
  const addresses = await Address.findAll({ where: { usuarioId: userId } });

  if (addresses == null) {
    return { addresses: [] };
  }

  return { addresses };
};

const createAddresss = async (address, userId) => {
  await Address.create({ ...address, usuarioId: userId });
};

export const AddressRepo = {
  getAddresses,
  createAddresss,
};
