import { Router } from "express";
import authRouter from "./auth.routes.js";
import prodRouter from "./products.routes.js";
import cartRouter from "./carts.routes.js";
import orderRouter from "./orders.routes.js";

const indexRouter = Router();

indexRouter.use("/v1/api/auth", authRouter);
indexRouter.use("/v1/api/products", prodRouter);
indexRouter.use("/v1/api/carts", cartRouter);
indexRouter.use("/v1/api/orders", orderRouter);

export default indexRouter;
