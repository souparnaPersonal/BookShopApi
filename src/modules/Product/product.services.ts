import { TBook } from './product.interface';
import { Book } from './product.model';

const createBook = async (book: TBook) => {
  const result = await Book.create(book);
  return result;
};

export const productServices = {
  createBook,
};
