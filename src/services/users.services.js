import User from "../models/user.model.js";

const getAllUsers = async () => await User.find().lean();

const getUserById = async (id) => await User.findOne({ _id: id }).exec();

const getUserByEmail = async (email) =>
  await User.findOne({ email: email }).exec();

const updateUserById = async (id, data) =>
  await User.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true });

const deleteUserById = async (id) =>
  await User.findByIdAndDelete({ _id: id }).lean();

export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
