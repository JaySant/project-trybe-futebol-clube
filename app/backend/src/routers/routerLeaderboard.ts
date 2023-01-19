import { Router } from 'express';
import LeaderController from '../controllers/LeaderControllers';

const leaderboard = new LeaderController();
const router = Router();

router.get('/home', (req, res) => leaderboard.getLeaderHome(req, res));

export default router;
