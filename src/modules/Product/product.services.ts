import { TBook } from './product.interface';
import { Book } from './product.model';

const createBook = async (book: TBook) => {
  const result = await Book.create(book);
  return result;
};

const getAllBooks = async (searchTerm: any) => {
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

const updateSpecificBook = async (id: string, updatedFields: any) => {
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
