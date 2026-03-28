import { Router } from "express";
import authorize from "../../middleware/authenticate.middleware.js";
import { getStats, login, getSessions, getRawQueries, searchSessions } from "../../modules/dashboard/dashboard.controller.js";

const router = Router();

router.post('/login', login);

router.use(authorize);

router.get('/stats', getStats);
router.get('/sessions', getSessions);
router.get('/sessions/search', searchSessions);
router.get('/raw-queries', getRawQueries);


export default router;