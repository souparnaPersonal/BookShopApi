import express from 'express';
import { bookControllers } from './product.controllers';

const router = express.Router();

router.post('/api/products', bookControllers.createBook);

export const BookRoutes = router;
