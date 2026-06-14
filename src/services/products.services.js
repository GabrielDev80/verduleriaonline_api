import Product from "../models/product.model.js";

const getAll = async () => await Product.find().lean();

const getById = async (id) => await Product.findOne({ _id: id }).lean();

const create = async (data) => await Product.create(data);

const update = async (id, data) =>
  await Product.findByIdAndUpdate({ _id: id }, { $set: info }, { new: true });

const remove = async (id) =>
  await Product.findByIdAndDelete({ _id: id }).lean();

export { getAll, getById, create, update, remove };
