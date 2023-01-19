import { Router } from 'express';
import MatchesControllers from '../controllers/MatcheControllers';

const matchesControllers = new MatchesControllers();
const router = Router();

router.get('/', (req, res) => matchesControllers.getMatches(req, res));
router.post('/', (req, res) => matchesControllers.createMatches(req, res));

export default router;
