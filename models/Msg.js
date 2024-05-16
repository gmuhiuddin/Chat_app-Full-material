import mongoose from "mongoose";

const { Schema, model } = mongoose;

const msgSchema = new Schema({
    msgId: {
        required: true,
        type: String
    },
    msg: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    }
});

const Msg = model("msgs", msgSchema);

export default Msg;