import jwt from "jsonwebtoken";
import config from "../config/config.js";

/*  */
export const generateToken = (userDTO) => {
  // console.log("generateToken - Usuario recibido:", user);

  return jwt.sign({ id: userDTO.id, role: userDTO.role }, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  });
};

export const verifyToken = (token) =>
  jwt.verify(token, config.jwt.secret, (err) => (err ? false : true));
