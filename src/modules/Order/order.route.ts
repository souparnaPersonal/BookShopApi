import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

router.post('/api/orders', orderController.orderAProduct);
router.get('/api/orders/revenue', orderController.calculateTotalRevenue);

export const OrderRoutes = router;
