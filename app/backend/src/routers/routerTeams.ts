import { Router } from 'express';
import TeamsControllers from '../controllers/TeamControllers';

const teamsControllers = new TeamsControllers();
const router = Router();

router.get('/', (req, res) => teamsControllers.getTeams(req, res));
router.get('/:id', (req, res) => teamsControllers.getIdTeams(req, res));
export default router;
