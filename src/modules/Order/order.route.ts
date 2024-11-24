import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

router.post('/orders', orderController.orderAProduct);
router.get('/orders/revenue', orderController.calculateTotalRevenue);

export const OrderRoutes = router;
