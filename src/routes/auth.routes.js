import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const authRouter = Router();

// Register
authRouter.use("/register", register);
// Login
authRouter.use("/login", login);
// Profile
// authRouter.use("/profile");

export default authRouter;
