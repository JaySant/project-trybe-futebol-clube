import { Router } from 'express';
import MatchesControllers from '../controllers/MatcheControllers';
import validate from '../middlewares/validateToken';

const matchesControllers = new MatchesControllers();
const router = Router();

router.get('/', (req, res) => matchesControllers.getMatches(req, res));
router.post('/', validate, (req, res) => matchesControllers.createMatches(req, res));
router.patch('/:id/finish', (req, res) => matchesControllers.uptadeMatches(req, res));

export default router;
