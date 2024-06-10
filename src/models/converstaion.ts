import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    messages: [
        {
            author: {
                firstName: String,
                type: String,
            },
            content: {
                type: String,
            },
            type: {
                type: String,
            },
        },
    ]
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;