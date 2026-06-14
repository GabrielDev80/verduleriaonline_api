import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { isCompleteData } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// Register
authRouter.post("/register", isCompleteData, register);
// Login
authRouter.post("/login", login);
// Profile
// authRouter.use("/profile");

export default authRouter;
