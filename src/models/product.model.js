import mongoose from "mongoose";

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
      enum: ["frutas", "verduras", "almacen"],
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
      enum: ["bandeja", "Kg", "unidad", "atado"],
    },
    stock: {
      quantity: {
        type: Number,
        default: 0,
      },
      unit: {
        type: String,
        enum: ["bandeja", "Kg", "un"],
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
    purchase_costs: {
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
        enum: ["bandeja", "Kg", "un"],
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
