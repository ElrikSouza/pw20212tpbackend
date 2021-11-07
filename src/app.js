import Express, { json } from "express";
import { CollaboratorsModule } from "./collaborators/collaborators-routes.js";
import { errorHandlingMiddleware } from "./errors/error-handler.middleware.js";
import { UsersModule } from "./users/users-routes.js";

export const app = Express();

app.use(json());
app.use(UsersModule);
app.use(CollaboratorsModule);
app.use(errorHandlingMiddleware);
