import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { loginAdmin, getStatsData, getSessionsData, getRawQueriesData, searchSessionsData } from "./dashboard.usecase.js";

export const login = asyncHandler(async (req, res) => {
    const { apiKey } = req.body;

    const token = await loginAdmin(apiKey);

    return res
        .status(200)
        .json(new ApiResponse(200, "Login successful", { token }));
});

export const getStats = asyncHandler(async (req, res) => {
    const stats = await getStatsData();

    return res.status(200).json(
        new ApiResponse(200, "Dashboard stats fetched", stats)
    );
});

export const getSessions = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    const result = await getSessionsData(page, limit);

    return res.status(200).json(
        new ApiResponse(200, "Sessions fetched", result)
    );
});

export const getRawQueries = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, sessionId } = req.query;

    const result = await getRawQueriesData(page, limit, sessionId);

    return res.status(200).json(
        new ApiResponse(200, "Raw queries fetched", result)
    );
});

export const searchSessions = asyncHandler(async (req, res) => {
    const { search = "", page = 1, limit = 20 } = req.query;

    const result = await searchSessionsData(search, page, limit);

    return res.status(200).json(
        new ApiResponse(200, "Sessions searched", result)
    );
});