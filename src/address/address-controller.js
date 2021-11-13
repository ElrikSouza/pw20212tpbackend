import { wrapWithErrorHandling } from "../errors/error-handling.js";
import { AddressService } from "./address-service.js";

const getAddresses = wrapWithErrorHandling(async (req, res) => {
  const { user_id } = req;

  const address = await AddressService.getAddresses(user_id);

  return res.status(200).send(address);
});

const createAddress = wrapWithErrorHandling(async (req, res) => {
  const { body: address, user_id } = req;

  await AddressService.createAddress(address, user_id);

  return res.status(201).send({ msg: "Endereco criado" });
});

export const AddressController = {
  getAddresses,
  createAddress,
};
