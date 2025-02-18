import mongoose from 'mongoose';
import { TBook } from './product.interface';
import { Book } from './product.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { searchableFields } from './product.constants';

const createBook = async (book: TBook) => {
  // const newBook = new Book(book);
  // const result = newBook.save();
  const result = await Book.create(book);

  return result;
};

const getAllBooks = async (query: Record<string, unknown>) => {
  const getAllBooksQuery = new QueryBuilder(Book.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await getAllBooksQuery.modelQuery;
  const meta = await getAllBooksQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleBook = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid id no book found');
  }
  const result = await Book.findById({
    _id: Object(id),
  });

  return result;
};

const updateSpecificBook = async (
  id: string,
  updatedFields: Partial<TBook>,
) => {
  console.log(updatedFields);
  const result = await Book.findOneAndUpdate(
    { _id: Object(id) },
    {
      $set: updatedFields,
    },
    { new: true, runValidators: true, timestamps: true },
  );

  return result;
};

const deleteAbook = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid id no book found for delete');
  }
  const result = await Book.deleteOne({ _id: id });
  return result;
};

export const productServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSpecificBook,
  deleteAbook,
};
