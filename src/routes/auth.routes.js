import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { isCompleteData } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// Register
authRouter.post("/register", isCompleteData, register);
// Login
authRouter.post("/login", login);
// Profile
// authRouter.use("/me", authenticate, auth.controller.me);

export default authRouter;
