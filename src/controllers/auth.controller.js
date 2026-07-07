import { loginResponse } from "../dto/auth.dto.js";
import * as authService from "../services/auth.service.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      status: "success",
      message:
        "¡Bienvenido a Modo Huerta Online! Tu registro se completó correctamente.",
      payload: user,
    });
  } catch (error) {
    console.error("authController - register: ", error);
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.statusCode ? error.message : "Internal Server Error",
    });
  }
};

export const registerAdmin = async (req, res, next) => {
  try {
    const admin = await authService.registerAdmin(req.body);

    res.status(201).json({
      status: "success",
      message: "Admin created successfully",
      payload: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    const userResponse = loginResponse(user);
    // log.info("login Backend - userResponse: " + userResponse);
    // log.info("login Backend - Token: " + token);

    res.status(200).json({
      status: "success",
      message: `¡Hola de nuevo, ${user.username}!`,
      payload: { user: userResponse, token: token },
    });
  } catch (error) {
    console.error("authController - login: ", error);
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.statusCode ? error.message : "Internal Server Error",
    });
  }
};
