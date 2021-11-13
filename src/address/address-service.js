import { AddressRepo } from "./address-repo.js";

const getAddresses = async (user_id) => {
  const result = await AddressRepo.getAddresses(user_id);

  return result;
};

const createAddress = async (address, user_id) => {
  await AddressRepo.createAddresss(address, user_id);
};

export const AddressService = {
  getAddresses,
  createAddress,
};
