import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { BookRoutes } from './modules/Product/product.route';
import { OrderRoutes } from './modules/Order/order.route';
import { AuthRoutes } from './modules/Auth/auth.routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')(
  'sk_test_51M5sVrSH7xFCRHqMcMvq5A2TZ7iN66XoCTDkr5lUgHHkHOr4xfgsu01Rj9OwT19tMhfGAUzfikWHQ7aNlZ5sbEcJ00UGuYFIi9',
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173'], // Frontend origin
  credentials: true, // Allow cookies
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Handle Preflight Requests
// app.options('*', cors(corsOptions));

// Routes
app.use('/api', BookRoutes);
app.use('/api', OrderRoutes);
app.use('/api', AuthRoutes);

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to API',
  });
});
app.post('/create-checkout-session', async (req, res) => {
  console.log('test');
  try {
    const { product } = req.body;

    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1, // Ensure quantity is included
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/sucess',
      cancel_url: 'http://localhost:5173/failed',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

app.use(globalErrorHandler);

export default app;
