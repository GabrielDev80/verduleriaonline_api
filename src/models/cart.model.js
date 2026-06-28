import mongoose from "mongoose";

const cartCollection = "Carts";

const cartProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0.01,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const cartSchema = new mongoose.Schema(
  {
    products: [cartProductSchema],
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model(cartCollection, cartSchema);

export default Cart;
