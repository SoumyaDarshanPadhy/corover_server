import ApiError from "../../utils/ApiError.js";

const INTENTS = {
    greeting: ["hi", "hello", "hey"],
    farewell: ["bye", "goodbye", "see you"],
    help: ["help", "assist", "support me"],
    pricing: ["price", "cost", "plan", "pricing"],
    support: ["issue", "problem", "error", "bug"],
};

const RESPONSES = {
    greeting: [
        "Hello! How can I help you?",
        "Hi there! What can I do for you?",
        "Hey! Need any assistance?"
    ],
    farewell: [
        "Goodbye! Have a great day!",
        "See you soon!",
        "Bye! Take care!"
    ],
    help: [
        "Sure, I’m here to help. What do you need?",
        "Tell me your issue and I’ll assist you.",
        "Happy to help! What’s the problem?"
    ],
    pricing: [
        "We offer flexible pricing plans.",
        "Our pricing depends on your needs.",
        "Let me guide you through our pricing options."
    ],
    support: [
        "I understand you're facing an issue.",
        "Let me help you resolve this problem.",
        "Our support team is here for you."
    ],
    unknown: [
        "I’m not sure I understood that.",
        "Could you please rephrase?",
        "I didn’t get that, can you try again?"
    ]
};

const detectIntent = (message) => {
    const text = message.toLowerCase();

    for (const [intent, keywords] of Object.entries(INTENTS)) {
        if (keywords.some((word) => text.includes(word))) {
            return intent;
        }
    }

    return "unknown";
};

const getRandomReply = (intent) => {
    const replies = RESPONSES[intent] || RESPONSES.unknown;
    return replies[Math.floor(Math.random() * replies.length)];
};

export const processMessage = async ({ sessionId, message, chatRepository }) => {
    if (!sessionId || !message) {
        throw new ApiError(400, "sessionId and message are required");
    }

    const intent = detectIntent(message);

    const reply = getRandomReply(intent);

    const chatData = {
        sessionId,
        userMessage: message,
        botReply: reply,
        intent,
        timestamp: new Date()
    };

    await chatRepository.createMessage(chatData);

    return {
        sessionId,
        reply,
        intent,
        timestamp: chatData.timestamp
    };
};