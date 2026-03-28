import { Router } from "express";
import { sendMessage, getHistory } from "../../modules/chat/chat.controller.js";


const router = Router();

router.post('/message', sendMessage);

router.get('/history/:sessionId', getHistory);

export default router;