import { loginResponse } from "../dto/auth.dto.js";
import * as authService from "../services/auth.services.js";

export const register = async (req, res) => {
  try {
    // console.log("authController - register: ", req.body);
    const user = await authService.register(req.body);

    res.status(201).json({
      status: "success",
      message:
        "¡Bienvenido a Verde Web Online! Tu registro se completó correctamente.",
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    const userResponse = loginResponse(user);

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
