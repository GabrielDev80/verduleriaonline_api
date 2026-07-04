import { Router } from "express";
import { createOrder } from "../controllers/orders.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const orderRouter = Router();

orderRouter.use(authenticate);

/* 
orderRouter.get("/"); condicional segun role

if (req.user.role === "admin") {
  return getAllOrders();
}

return getOrdersByUser(req.user.id);
*/
// orderRouter.get("/"); //* condicional segun role

orderRouter.post("/", createOrder);

// orderRouter.get("/:oid");

// orderRouter.patch("/:oid/status"); //* Admin

export default orderRouter;
