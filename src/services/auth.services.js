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
  console.log("login back: ", user);

  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isValid = await comparePassword(password, user.password);
  console.log("isValid: ", isValid);
  if (!isValid) {
    throw new Error("Invalid Credentials");
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
