import express from 'express';
import { bookControllers } from './product.controllers';

const router = express.Router();

router.post('/api/products', bookControllers.createBook);
router.get('/api/products', bookControllers.getAllBook);
router.get('/api/products/:productId', bookControllers.getSingleBook);
router.put('/api/products/:productId', bookControllers.updateSpecificBook);
router.delete('/api/products/:productId', bookControllers.deleteAbook);
export const BookRoutes = router;
