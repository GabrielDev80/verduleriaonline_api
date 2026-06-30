import mongoose from "mongoose";

const userCollection = "Users";

const deliveryAddressSchema = new mongoose.Schema({
  address: {
    type: String,
    trim: true,
  },
  between_streets: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  additional_data: {
    type: String,
    trim: true,
  },
});
const deliveryDataSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    delivery_addresses: [deliveryAddressSchema],
  },
  {
    _id: false,
  },
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    delivery_data: {
      type: deliveryDataSchema,
      default: {},
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carts",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model(userCollection, userSchema);
export default User;
