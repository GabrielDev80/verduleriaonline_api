import * as authService from "../services/auth.services.js";

export const register = async (req, res) => {
  try {
    // console.log("authController - register: ", req.body);
    const user = await authService.register(req.body);

    res.status(201).json({
      status: "success",
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

    res.status(200).json({
      status: "success",
      payload: { user: user, token: token },
    });
  } catch (error) {
    console.error("authController - login: ", error);
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.statusCode ? error.message : "Internal Server Error",
    });
  }
};

// export const profile = async(req, res, next);
