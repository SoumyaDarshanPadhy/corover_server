import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { processMessage } from "./chat.usecase.js";
import * as chatRepository from "./chat.repository.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const { sessionId, message } = req.body;

    const result = await processMessage({
        sessionId,
        message,
        chatRepository
    });

    return res
        .status(200)
        .json(new ApiResponse(200, "Message processed", result));
});

export const getHistory = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;
    let { page = 1, limit = 20 } = req.query;

    if (!sessionId) {
        throw new ApiError(400, "sessionId is required");
    }

    const result = await chatRepository.getHistory(sessionId, page, limit);

    return res.status(200).json(
        new ApiResponse(200, "History fetched", result)
    );
});