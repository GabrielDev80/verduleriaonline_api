import Counter from "../models/counter.model.js";

export const getNextSequence = async (counter) => {
  const doc = await Counter.findOneAndUpdate(
    { _id: counter.id },
    {
      $inc: { sequence: 1 },
      $setOnInsert: {
        _id: counter.id,
      },
    },
    {
      returnDocument: "after",
      upsert: true,
    },
  );
  return doc.sequence;
};
