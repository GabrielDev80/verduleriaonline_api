import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  updateDeliveryData,
} from "../controllers/users.controller.js";
import { use } from "react";

const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/users/:id", updateUser);

/* Actualiza: first_name, last_name, phone */
userRouter.patch("/users/:id/delivery-data", updateDeliveryData);

// TODO: Agregar los controllers para:
/* Agrega una dirección nueva. */
userRouter.post("/users/:id/delivery-addresses");
/* Edita una dirección existente. */
userRouter.patch("/users/:id/delivery-addresses/:addressId");
/* Elimina una dirección */
userRouter.delete("/users/:id/delivery-addresses/:addressId");
/* Marca una dirección como predeterminada. */
userRouter.patch("/users/:id/delivery-addresses/:addressId/default");

export default userRouter;
