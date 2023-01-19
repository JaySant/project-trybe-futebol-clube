import { Router } from 'express';
import LeaderController from '../controllers/LeaderControllers';

const leaderboard = new LeaderController();
const router = Router();

router.get('/home', (req, res) => leaderboard.getLeaderHome(req, res));
router.get('/away', (req, res) => leaderboard.getLeaderAway(req, res));

export default router;
