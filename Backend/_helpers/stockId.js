import { Counter } from "../models/counterModel.js";

const getNextSequence = async (id) => {
    const counter = await Counter.findOneAndUpdate(
        { id: id },
        { $inc: { seq: 1 } },  // Increment the sequence by 1
        { new: true, upsert: true }  // Create document if it doesn't exist
    );
    return counter.seq;
};

export default getNextSequence;
