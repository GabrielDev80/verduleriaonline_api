import { Router } from "express";
import authRouter from "./auth.routes.js";
import prodRouter from "./products.routes.js";

const indexRouter = Router();

indexRouter.use("/v1/api/auth", authRouter);
indexRouter.use("/v1/api/products", prodRouter);

export default indexRouter;
