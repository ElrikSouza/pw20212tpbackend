import Express, { json } from "express";
import { CollaboratorsModule } from "./collaborators/collaborators-routes.js";
import { errorHandlingMiddleware } from "./errors/error-handler.middleware.js";
import { UsersModule } from "./users/users-routes.js";
import cors from "cors";
import { ProductsModule } from "./products/products-routes.js";
import { AddressModule } from "./address/address-routes.js";
import { OrdersModule } from "./orders/orders-routes.js";

export const app = Express();

app.use(json());
app.use(cors({ origin: "*" }));
app.use(UsersModule);
app.use(CollaboratorsModule);
app.use(ProductsModule);
app.use(AddressModule);
app.use(OrdersModule);
app.use(errorHandlingMiddleware);
