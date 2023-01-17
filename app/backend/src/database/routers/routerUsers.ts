import { Router } from 'express';
import UsersController from '../controllers/UserControllers';

const usersController = new UsersController();
const router = Router();

router.post('/', (req, res) => usersController.authLogin(req, res));

export default router;
