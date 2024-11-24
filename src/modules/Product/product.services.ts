import { TBook } from './product.interface';
import { Book } from './product.model';

const createBook = async (book: TBook) => {
  const newBook = new Book(book);
  const result = newBook.save();
  return result;
};

const getAllBooks = async (searchTerm: unknown) => {
  console.log('service', searchTerm);

  const query = searchTerm
    ? {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const result = await Book.find(query);

  return result;
};

const getSingleBook = async (id: string) => {
  const result = await Book.findById({
    _id: Object(id),
  });
  return result;
};

const updateSpecificBook = async (id: string, updatedFields: object) => {
  const result = await Book.findOneAndUpdate(
    { _id: Object(id) },
    {
      $set: updatedFields,
    },
    { new: true },
  );

  return result;
};

const deleteAbook = async (id: string) => {
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
