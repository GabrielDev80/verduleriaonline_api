import { Router } from "express";
import * as prodController from "../controllers/products.controller.js";
// import { isDataRequired } from "../middlewares/products.middleware.js";

const prodRouter = Router();

prodRouter.get("/", prodController.getproducts);
prodRouter.post("/", prodController.createProduct);
prodRouter.get("/:id", prodController.getProductById);
prodRouter.patch("/:id", prodController.updateProduct);
prodRouter.patch("/:id", prodController.pauseProduct);
prodRouter.delete("/:id", prodController.deleteProduct);

export default prodRouter;
