import * as authService from "../services/auth.services.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    // Retorna el throw del auth
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const profile = async(req, res, next);
