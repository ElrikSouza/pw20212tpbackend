import { Router } from "express";
import { UsersController } from "./users-controller.js";

export const UsersModule = Router();

UsersModule.post("/users", UsersController.signUp).post(
  "/signin",
  UsersController.signIn
);
