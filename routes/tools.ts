import express from 'express';
import {
  createTool,
  getAllTools,
  updateTool,
  deleteTool,
  getOneTool,
} from '../controllers/toolsController.ts';
import { decodeToken } from '../middleware/secure.ts';
const router = express.Router();

router.post('/create',decodeToken, createTool);
router.get('/', getAllTools);
router.put('/:id', decodeToken,updateTool);
router.delete('/:id',decodeToken, deleteTool);
router.get('/:id', getOneTool);

export default router;
