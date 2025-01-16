import express from 'express';
import {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
  recyclePost,
  restorePost,
  acceptPost,
} from '../controllers/Post';
import { decodeToken } from '../middleware/security/jwt.ts';

const router = express.Router();

router.post('/create', decodeToken, createPost);


router.get('/', getAllPosts);


router.get('/:id',decodeToken, getOnePost);

router.put('/:id',decodeToken, updatePost);

router.delete('/:id',decodeToken, deletePost);


router.put('/recycle/:id',decodeToken, recyclePost);

router.put('/restore/:id',decodeToken, restorePost);

router.put('/accept/:id',decodeToken, acceptPost);

export default router;
