import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;

    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        throw new ApiError(401, "Unauthorized Access");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(403, "Invalid or expired token");
    }
};

export default authorize;