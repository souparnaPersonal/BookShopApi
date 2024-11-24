import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string(),
  quantity: z
    .number()
    .int()
    .min(1, { message: 'Quantity should not be negative or zero' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price should be a positive number' }),
});
