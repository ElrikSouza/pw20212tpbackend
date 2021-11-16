import { Router } from "express";
import { jwtMiddleware } from "../jwt/jwt-middleware.js";
import { OrdersController } from "./order-controller.js";

export const OrdersModule = Router();

OrdersModule.post("/orders", jwtMiddleware, OrdersController.createOrder);
