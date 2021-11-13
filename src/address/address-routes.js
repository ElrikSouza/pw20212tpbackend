import { Router } from "express";
import { jwtMiddleware } from "../jwt/jwt-middleware.js";
import { AddressController } from "./address-controller.js";

export const AddressModule = Router();

AddressModule.post("/addresses", AddressController.createAddress);
AddressModule.get("/addresses", jwtMiddleware, AddressController.getAddresses);
