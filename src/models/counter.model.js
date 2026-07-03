import mongoose from "mongoose";

const counterCollection = "Counters";

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },

  sequence: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model(counterCollection, counterSchema);

export default Counter;
