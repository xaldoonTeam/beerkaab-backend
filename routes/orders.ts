import express from 'express';
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/companyOrder.ts';

const router = express.Router();

router.get('/', getAllOrders);
router.post('/create', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
