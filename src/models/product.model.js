import mongoose from "mongoose";
import {
  BASE_UNITS,
  PROD_CATEGORIES,
  SALES_UNITS,
} from "../constants/common.constants.js";

const productCollection = "Products";
const productSchema = mongoose.Schema(
  {
    //* Visible para el usuario
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: PROD_CATEGORIES,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sales_price: {
      type: Number,
    },
    sales_unit: {
      type: String,
      enum: SALES_UNITS,
    },
    min_sale_quantity: {
      type: Number,
      default: 1,
    },
    sale_step: {
      type: Number,
      default: 1,
    },
    stock: {
      quantity: {
        type: Number,
        default: 0,
      },
      unit: {
        type: String,
        enum: BASE_UNITS,
      },
    },
    observations: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },

    //* Costos mayorista
    purchase_info: {
      package_cost: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
        enum: BASE_UNITS,
      },
      unit_cost: {
        type: Number,
      },
    },
    profit_percentage: {
      type: Number,
    },
    profit_amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model(productCollection, productSchema);

export default Product;
