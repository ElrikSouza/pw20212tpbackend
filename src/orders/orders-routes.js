import { Router } from "express";
import { OrdersController } from "./order-controller.js";

export const OrdersModule = Router();

OrdersModule.post("/orders", OrdersController.createOrder);
