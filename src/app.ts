import express, { Application } from 'express';

import cors from 'cors';
import { BookRoutes } from './modules/Product/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/bookShop', BookRoutes);

export default app;
