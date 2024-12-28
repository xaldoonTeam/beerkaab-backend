import {
  createUser,
  login,
  updateUser,
  deleteUser,
} from '../controllers/userController.ts';
import express from 'express';

const router = express.Router();

router.post('/create', createUser);
router.get('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
