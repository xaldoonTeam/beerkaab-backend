import { createUser, login } from '../controllers/userController.ts';
import express from 'express';

const router = express.Router();

router.post('/create', createUser);
router.put('/login', login);

export default router;
