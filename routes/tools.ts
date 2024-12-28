import express from 'express';
import {
  createTool,
  getAllTools,
  updateTool,
  deleteTool,
  getOneTool,
} from '../controllers/toolsController.ts';
const router = express.Router();

router.post('/create', createTool);
router.get('/', getAllTools);
router.put('/:id', updateTool);
router.delete('/:id', deleteTool);
router.get('/:id', getOneTool);

export default router;
