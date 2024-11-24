import express, { Application } from 'express';

import cors from 'cors';
import { BookRoutes } from './modules/Product/product.route';
import { OrderRoutes } from './modules/Order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', BookRoutes);
app.use('/api', OrderRoutes);

export default app;
