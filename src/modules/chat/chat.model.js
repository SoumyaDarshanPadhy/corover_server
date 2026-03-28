import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        sessionId: { type: String, required: true, index: true, trim: true },
        userMessage: { type: String, required: true, },
        botReply: { type: String, required: true, },
        intent: { type: String, required: true, },
        timestamp: { type: Date, default: Date.now, index: true }
    }
);

chatSchema.index({ sessionId: 1, timestamp: -1 });

export default mongoose.model("Chat", chatSchema);