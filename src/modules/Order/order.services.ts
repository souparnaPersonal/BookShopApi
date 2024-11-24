import { Book } from '../Product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const orderAProduct = async (data: TOrder) => {
  const book = await Book.findById(data.product);

  if (!book) {
    throw new Error('Book not found.');
  }

  if (book.quantity < data.quantity) {
    throw new Error('Insufficient stock to fulfill the order.');
  }

  const result = await Order.create(data);

  await Book.updateOne(
    { _id: data.product },
    {
      $inc: { quantity: -data.quantity },
    },
  );

  const updatedBook = await Book.findById(data.product);
  if (updatedBook && updatedBook.quantity === 0) {
    await Book.updateOne({ _id: data.product }, { $set: { inStock: false } });
  }

  return result;
};

const calculateTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        totalRevenue: 1,
        _id: 0,
      },
    },
  ]);

  return result[0];
};

export const orerServices = {
  orderAProduct,
  calculateTotalRevenue,
};
