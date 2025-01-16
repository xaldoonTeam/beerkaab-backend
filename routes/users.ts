import {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../controllers/userController.ts';
import express from 'express';
import { decodeToken } from '../middleware/secure.ts';



const router = express.Router();

router.post('/create', createUser);
router.put('/login', login);
router.put('/:id',decodeToken, updateUser);
router.get("/All",decodeToken, getAllUsers)
router.delete('/:id',decodeToken, deleteUser);
router.put('/update-role/:id',decodeToken, updateUserRole);


export default router;
