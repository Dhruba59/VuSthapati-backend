import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    senderEmail: {
        type: String,
        required: true,
        trim: true,
    },
    recipientEmail: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);
export default Message;