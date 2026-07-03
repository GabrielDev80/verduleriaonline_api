import { Router } from "express";
import * as prodController from "../controllers/products.controller.js";
// import { isDataRequired } from "../middlewares/products.middleware.js";

const prodRouter = Router();

prodRouter.get("/", prodController.getproducts);
prodRouter.post("/", prodController.createProduct);
prodRouter.get("/:pid", prodController.getProductById);
prodRouter.patch("/:pid", prodController.updateProduct);
prodRouter.patch("/:pid", prodController.pauseProduct);
prodRouter.delete("/:pid", prodController.deleteProduct);

export default prodRouter;
