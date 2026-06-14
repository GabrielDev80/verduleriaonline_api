import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
} from "../controllers/users.controller.js";
import { use } from "react";

const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/users/:id", updateUser);

export default userRouter;
