import bcrypt, { hash } from "bcrypt";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const comparePassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);
