import mongoose from "mongoose";

const orderCollection = "Orders";
const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pendiente", "preparando", "en_camino", "entregado"],
      default: "pendiente",
    },
  },
  {
    timestamps: true,
  },
);

const orderModel = mongoose.model(orderCollection, orderSchema);

export default orderModel;
