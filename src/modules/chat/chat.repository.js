import Chat from "./chat.model.js";

export const createMessage = async (data) => {
    return await Chat.create(data);
};

export const getHistory = async (sessionId, page = 1, limit = 20) => {
    page = Number(page) || 1;
    limit = Number(limit) || 20;

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
        Chat.find({ sessionId })
            .select("sessionId userMessage botReply intent timestamp")
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        Chat.countDocuments({ sessionId })
    ]);

    return {
        messages,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
};