import dashboardRoutes from "./dashboard/dashboard.routes.js";
import chatRoutes from "./chat/chat.routes.js";

export const registerRoutes = (app) => {
    app.use("/api/chat", chatRoutes);
    app.use("/api/dashboard", dashboardRoutes);
};  