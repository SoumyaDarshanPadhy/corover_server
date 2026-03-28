import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError.js";
import env from "../../config/env.js";
import * as dashboardRepository from "./dahsboard.repository.js";

export const loginAdmin = async (apiKey) => {
    if (!apiKey) {
        throw new ApiError(400, "API key is required");
    }

    if (apiKey !== env.ADMIN_API_KEY) {
        throw new ApiError(401, "Invalid API key");
    }

    const token = jwt.sign(
        { role: "admin" },
        env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1h",
            algorithm: "HS256"
        }
    );

    return token;
};


export const getStatsData = async () => {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const [
        totalMessages,
        totalSessions,
        messagesPerDay,
        topIntents
    ] = await Promise.all([
        dashboardRepository.getTotalMessages(),
        dashboardRepository.getTotalSessions(),
        dashboardRepository.getMessagesPerDay(last7Days),
        dashboardRepository.getTopIntents()
    ]);

    return {
        totalMessages,
        totalSessions,
        messagesPerDay,
        topIntents
    };
};

export const getSessionsData = async (page, limit) => {
    return await dashboardRepository.getSessions(page, limit);
};

export const searchSessionsData = async (searchTerm, page, limit) => {
    return await dashboardRepository.searchSessions(searchTerm, page, limit);
};

export const getRawQueriesData = async (page, limit, sessionId) => {
    return await dashboardRepository.getRawQueries(page, limit, sessionId);
};