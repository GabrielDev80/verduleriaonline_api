import User from "../models/user.model.js";
import * as cartService from "../services/carts.service.js";
import { normalizedUserData } from "../utils/auth/auth.utils.js";
import { createHash, comparePassword } from "../utils/bcrypt.js";
import { AppError } from "../utils/errors.js";
import { generateToken } from "../utils/jwt.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

const register = async (userData) => {
  const formattedData = normalizedUserData(userData);

  const existingUser = await User.findOne({
    email: formattedData.email,
  });

  if (existingUser) {
    log.error("authService - register: User already exists");
    throw new AppError("El email ya está registrado.", 400);
  }

  const user = await User.create({
    ...formattedData,
    password: createHash(formattedData.password),
  });

  const cart = await cartService.createUserCart();

  user.cart = cart._id;
  await user.save();
  // console.log("authService - register: ", user);
  return user;
};

const login = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new AppError(
      "Correo electrónico o contraseña incorrectos. Inténtalo de nuevo.",
      400,
    );
  }
  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new AppError(
      "Correo electrónico o contraseña incorrectos. Inténtalo de nuevo.",
      400,
    );
  }

  await cartService.findOrCreateCart(user);

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    user,
    token,
  };
};

export { register, login };
