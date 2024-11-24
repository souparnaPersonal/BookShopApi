import mongoose, { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

export const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Product ID is required'],
    ref: 'Book',
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity should not negative or zero'],
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [1, 'Quantity should not negative or zero'],
  },
});

orderSchema.set('timestamps', true);
export const Order = model<TOrder>('Order', orderSchema);
