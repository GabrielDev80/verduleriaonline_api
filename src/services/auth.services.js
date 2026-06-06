import User from "../models/user.model.js";
import { createHash, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

const register = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    ...userData,
    password: createHash(userData.password),
  });

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error({
      status: 401,
      message: "Invalid Credentials",
    });
  }
  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error({
      status: 401,
      message: "Invalid Credentials",
    });
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
