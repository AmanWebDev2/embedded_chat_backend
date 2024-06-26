import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
  },

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    // hash password using bcrypt
    if (!this.isModified) {
        next();
      }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;