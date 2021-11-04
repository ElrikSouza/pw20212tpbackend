import Express, { json } from "express";
import { errorHandlingMiddleware } from "./errors/error-handler.middleware.js";
import { UsersModule } from "./users/users-routes.js";

export const app = Express();

app.use(json());
app.use(UsersModule);
app.use(errorHandlingMiddleware);
