import { AddressRepo } from "./address-repo.js";
import { validateAddress } from "./address-validator.js";

const getAddresses = async (user_id) => {
  const result = await AddressRepo.getAddresses(user_id);

  return result;
};

const createAddress = async (address, user_id) => {
  const validatedAddress = await validateAddress(address);
  await AddressRepo.createAddresss(validatedAddress, user_id);
};

export const AddressService = {
  getAddresses,
  createAddress,
};
