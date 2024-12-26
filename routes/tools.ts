import express from 'express';
import { createTool, getAllTools } from '../controllers/toolsController.ts';
const router = express.Router();

router.post('/create', createTool);
router.get('/', getAllTools);

export default router;
