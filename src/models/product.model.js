import mongoose from "mongoose";

const productCollection = "Products";
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // Costos mayorista
    wholesale_cost: wholesaleCostSchema,
    unitCost: unitCostFn,
    stock: stockSchema,
    catregory: {
      type: String,
      enum: ["fruta", "verdura"],
    },
    image: {
      String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    observations: String,
  },
  {
    timestamps: true,
  },
);

const wholesaleCostSchema = mongoose.Schema({
  cost: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: [
      "bandeja",
      "bolsa",
      "caja",
      "cajon",
      "jaula",
      "kilo",
      "kilos",
      "paquete",
      "planta",
      "unidad",
    ],
  },
});
const stockSchema = mongoose.Schema({
  quantity: {
    type: Number,
  },
  unit: {
    type: String,
    enum: [
      "bandeja",
      "bolsa",
      "caja",
      "cajon",
      "jaula",
      "kilo",
      "kilos",
      "paquete",
      "planta",
      "unidad",
    ],
  },
});

const unitCostFn = wholesaleCostSchema.cost / wholesaleCostSchema.quantity;

const Product = mongoose.model(productCollection, productSchema);

export default Product;
