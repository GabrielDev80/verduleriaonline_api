import Counter from "../models/counter.model.js";

export const getNextSequence = async (counter) => {
  const doc = await Counter.findOneAndUpdate(
    counter.id,
    { $inc: { sequence: 1 } },
    { new: true },
  );

  return doc.sequence;
};
