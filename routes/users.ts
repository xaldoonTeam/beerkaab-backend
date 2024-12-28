import {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController.ts';
import express from 'express';
import { decodeToken } from '../middleware/security/jwt.ts';


const router = express.Router();

router.post('/create', createUser);
router.put('/login', login);
router.put('/:id', updateUser);
router.get("/All", getAllUsers)
router.delete('/:id', deleteUser);


export default router;
