import mongoose from "mongoose";

const userCollection = "Users";

const deliveryAddressSchema = new mongoose.Schema(
  {
    address: String,
    between_streets: String,
    location: String,
    additional_data: String,
  },
  {
    _id: false,
  },
);
const deliveryDataSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    phone: String,
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
