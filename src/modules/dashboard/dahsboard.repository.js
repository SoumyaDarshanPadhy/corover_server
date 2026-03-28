import Chat from "../chat/chat.model.js";

export const getTotalMessages = () => {
    return Chat.countDocuments();
};

export const getTotalSessions = async () => {
    const result = await Chat.aggregate([
        { $group: { _id: "$sessionId" } },
        { $count: "total" }
    ]);

    return result[0]?.total || 0;
};

export const getMessagesPerDay = (last7Days) => {
    return Chat.aggregate([
        {
            $match: {
                timestamp: { $gte: last7Days }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$timestamp"
                    }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } },
        {
            $project: {
                _id: 0,
                date: "$_id",
                count: 1
            }
        }
    ]);
};

export const getTopIntents = () => {
    return Chat.aggregate([
        {
            $group: {
                _id: "$intent",
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 3 },
        {
            $project: {
                _id: 0,
                intent: "$_id",
                count: 1
            }
        }
    ]);
};


export const getSessions = async (page = 1, limit = 20) => {
    page = Number(page) || 1;
    limit = Number(limit) || 20;

    const skip = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
        Chat.aggregate([
            {
                $group: {
                    _id: "$sessionId",
                    messageCount: { $sum: 1 },
                    startTime: { $min: "$timestamp" },
                    lastActivity: { $max: "$timestamp" }
                }
            },
            {
                $sort: { lastActivity: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 0,
                    sessionId: "$_id",
                    messageCount: 1,
                    startTime: 1,
                    lastActivity: 1
                }
            }
        ]),

        Chat.aggregate([
            {
                $group: { _id: "$sessionId" }
            },
            {
                $count: "total"
            }
        ])
    ]);

    return {
        sessions,
        total: total[0]?.total || 0,
        page,
        limit,
        totalPages: Math.ceil((total[0]?.total || 0) / limit)
    };
};

export const getRawQueries = async (page = 1, limit = 20, sessionId) => {
    page = Number(page) || 1;
    limit = Number(limit) || 20;

    const skip = (page - 1) * limit;

    const filter = {};
    if (sessionId) {
        filter.sessionId = sessionId;
    }

    const [queries, total] = await Promise.all([
        Chat.find(filter)
            .select("sessionId userMessage botReply intent timestamp")
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        Chat.countDocuments(filter)
    ]);

    return {
        queries,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
};