import User from "../models/user.model.js";
import { createHash, comparePassword } from "../utils/bcrypt.js";
import { AppError } from "../utils/errors.js";
import { generateToken } from "../utils/jwt.js";

const register = async (userData) => {
  // console.log("authService - register: ", userData);
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    // console.error("authService - register: User already exists");
    throw new AppError("User already exists", 400);
  }

  const user = await User.create({
    ...userData,
    password: createHash(userData.password),
  });
  // console.log("authService - register: ", user);
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email: email });
  // console.log("authService - login: ", user);

  if (!user) {
    throw new AppError("Invalid Credentials", 401);
  }
  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new AppError("Invalid Credentials", 400);
  }

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
