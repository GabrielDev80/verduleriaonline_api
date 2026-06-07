import { Router } from "express";
import authRouter from "./auth.routes.js";

const indexRouter = Router();

indexRouter.use("/v1/api/auth", authRouter);

export default indexRouter;
