import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  });

export const verifyToken = (token) =>
  jwt.verify(token, config.jwt.secret, (err) => (err ? false : true));
