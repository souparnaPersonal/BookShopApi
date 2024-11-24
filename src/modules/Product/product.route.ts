import express from 'express';
import { bookControllers } from './product.controllers';

const router = express.Router();

router.post('/products', bookControllers.createBook);
router.get('/products', bookControllers.getAllBook);
router.get('/products/:productId', bookControllers.getSingleBook);
router.put('/products/:productId', bookControllers.updateSpecificBook);
router.delete('/products/:productId', bookControllers.deleteAbook);
export const BookRoutes = router;
