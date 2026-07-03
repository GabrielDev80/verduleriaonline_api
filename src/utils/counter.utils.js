import Counter from "../models/counter.model.js";

export const getNextSequence = async (counter) => {
  try {
    console.log("getNextSequence - counter: ", counter);
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
    console.log("getNextSequence - doc: ", doc);
    return doc.sequence;
  } catch (error) {
    console.error(error);
  }
};
