import mongoose, { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

export const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

orderSchema.set('timestamps', true);
export const Order = model<TOrder>('Order', orderSchema);
