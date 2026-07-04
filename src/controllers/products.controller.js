import { createProductDTO, productResponseDTO } from "../dto/products.dto.js";
import * as prodServices from "../services/products.service.js";
import getLogger from "../utils/logger.utils.js";
import {
  calculateProfitAmount,
  calculateSalePrice,
  calculateUnitCost,
  roundSalePrice,
} from "../utils/products.utils.js";

const log = getLogger();
const getproducts = async (req, res) => {
  try {
    const products = await prodServices.getAll();
    if (products.length === 0) {
      log.info("getProducts no encontró productos");
      return res.status(404).json({
        status: "error",
        message: "Products not found",
      });
    }

    const formattedProducts = products.map((product) =>
      productResponseDTO(product),
    );

    return res.status(200).json({
      status: "success",
      message: "Products found",
      payload: formattedProducts,
    });
  } catch (error) {
    log.error("getProducts:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Id not send",
      });
    }
    const product = await prodServices.getById(id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Product found",
      payload: product,
    });
  } catch (error) {
    log.error("getProductById: ", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = await createProductDTO(req.body);

    const newProduct = await prodServices.create(productData);

    return res.status(201).json({
      status: "success",
      message: "New product created successfully",
      payload: newProduct,
    });
  } catch (error) {
    log.error("createProduct: ", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateProduct = await prodServices.update(id, data);
    res.status(200).json({
      status: "succes",
      message: "Product updated successfully",
      payload: updateProduct,
    });
  } catch (error) {
    log.error("updateProduct: ", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const pauseProduct = async (req, res) => {
  //TODO: Revisar controller
  try {
    const { id } = req.params;
    const data = req.body;
    const pausedProduct = await prodServices.update(id, data.active);
    log.info("pauseProduct: " + pausedProduct);
    res.status(200).json({
      status: "succes",
      message: "Product paused successfully",
      payload: pausedProduct,
    });
  } catch (error) {
    log.error("updateProduct: ", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prodServices.remove(id);
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    log.error("updateProduct: ", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export {
  getproducts,
  getProductById,
  createProduct,
  updateProduct,
  pauseProduct,
  deleteProduct,
};
