import jwt from "jsonwebtoken";
import config from "../config/config.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

export const isCompleteData = (req, res, next) => {
  // log.info("authMiddleware - isCompletData(request): ", req.body);
  if (!req.body || Object.keys(req.body).length === 0) {
    log.error("authMiddleware - isCompletData(request): Empty Request");
    return res.status(400).json({
      status: "error",
      message: "Empty request",
    });
  }

  const { username, email, password } = req.body;
  // log.info(req.body)
  if (!username?.trim()) {
    return res.status(400).json({
      status: "error",
      message: "Username is required",
    });
  }

  if (!email?.trim()) {
    return res.status(400).json({
      status: "error",
      message: "Email is required",
    });
  }

  if (!password?.trim()) {
    return res.status(400).json({
      status: "error",
      message: "Password is required",
    });
  }

  next();
};

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    log.info("authenticate (authHeader): ", authHeader);

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "No autorizado",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Token no proporcionado",
      });
    }

    const payload = jwt.verify(token, config.jwt.secret);
    log.info("authenticate (payload): ", payload); //! Reemplazar en producción
    // log.info("Authorization header recipe");

    req.user = payload;

    next();
  } catch (error) {
    log.error("Token inválido o expirado: ", error);
    return res.status(401).json({
      status: "error",
      message: "Token inválido o expirado",
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      log.error("authorize - Acceso denegado");
      return res.status(403).json({
        status: "error",
        messaje: "Acceso denegado",
      });
    }
    next();
  };
};
