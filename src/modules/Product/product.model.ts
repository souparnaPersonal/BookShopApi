import { Schema, model } from 'mongoose';
import { TBook } from './product.interface';

export const bookSchema = new Schema<TBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: {
        values: [
          'Fiction',
          'Science',
          'SelfDevelopment',
          'Poetry',
          'Religious',
        ],
        message: '{VALUE} is not valitd',
      },
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },

  {
    toJSON: {
      virtuals: true,
    },
  },
);

bookSchema.virtual('createdAt').get(function () {
  return `${new Date()}`;
});

export const Book = model<TBook>('Book', bookSchema);
