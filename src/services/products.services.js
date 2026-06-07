import Product from "../models/product.model.js";

const getAllProducts = async () => await Product.find().lean();

const getProductById = async (id) => await Product.findOne({ _id: id }).exec();

const getProductByEmail = async (email) =>
  await Product.findOne({ email: email }).exec();

const createProduct = async (data) => await Product.create(data).exec();

const updateProductById = async (id, data) =>
  await Product.findByIdAndUpdate({ _id: id }, { $set: info }, { new: true });

const deleteProductById = async (id) =>
  await Product.findByIdAndDelete({ _id: id }).lean();

export {
  getAllProducts,
  getProductById,
  getProductByEmail,
  createProduct,
  updateProductById,
  deleteProductById,
};
