import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    author: {
      firstName: {
        type: String,
        // required: true
      },
      type: {
        type: String,
        // required: true
      }
    },
    content: {
      type: String,
    //   required: true
    },
    type: {
      type: String,
    //   required: true
    }
  });
  

const conversationSchema = new mongoose.Schema({
    conversationId:{
        type: String,
        ref: "Conversation",
    },
    messages: [
        messageSchema
    ]
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;