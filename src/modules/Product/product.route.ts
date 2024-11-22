import express from 'express';
import { bookControllers } from './product.controllers';

const router = express.Router();

router.post('/api/products', bookControllers.createBook);
router.get('/api/products', bookControllers.getAllBook);

export const BookRoutes = router;
