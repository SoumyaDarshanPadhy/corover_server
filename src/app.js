import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler } from "./middleware/errorHandler.middleware.js";
import { registerRoutes } from "./routes/index.js";
import ApiResponse from "./utils/ApiResponse.js";

const app = express();

app.use(cors({

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json(new ApiResponse(200, "Welcome to Corover chat bot API", null));
});

registerRoutes(app);

app.use(errorHandler);

export default app;