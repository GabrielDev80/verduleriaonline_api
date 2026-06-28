import { Router } from "express";

import {
  getCart,
  addProduct,
  updateProduct,
  removeProduct,
  clearCart,
} from "../controllers/carts.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.use(authenticate);

cartRouter.get("/", getCart);

cartRouter.post("/products", addProduct);

cartRouter.patch("/products", updateProduct);

cartRouter.delete("/products/:productId", removeProduct);

cartRouter.delete("/", clearCart);

export default cartRouter;
