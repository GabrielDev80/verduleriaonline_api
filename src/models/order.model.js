import mongoose from "mongoose";
import {
  BASE_UNITS,
  PROD_CATEGORIES,
  SALES_UNITS,
} from "../constants/common.constants.js";
import {
  ORDER_STATUS,
  DELIVERY_METHODS,
  PAYMENT_METHODS,
} from "../constants/order.constants.js";

const orderCollection = "Orders";

const orderProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    sales_unit: {
      type: String,
      enum: SALES_UNITS,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0.01,
    },

    unit_price: {
      type: Number,
      required: true,
      min: 0,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    order_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customer: {
      first_name: {
        type: String,
        required: true,
        trim: true,
      },

      last_name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },

    delivery: {
      type: {
        type: String,
        enum: DELIVERY_METHODS,
        required: true,
      },

      address: {
        type: {
          address_alias: String,
          address: String,
          between_streets: String,
          location: String,
          additional_data: String,
        },
        default: null,
      },
    },

    payment: {
      method: {
        type: String,
        enum: PAYMENT_METHODS,
        required: true,
      },

      cash_received: {
        type: Number,
        default: null,
      },
    },

    products: {
      type: [orderProductSchema],
      required: true,
      validate: [(v) => v.length > 0, "La orden debe tener productos."],
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    delivery_cost: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ORDER_STATUS,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model(orderCollection, orderSchema);

export default Order;
