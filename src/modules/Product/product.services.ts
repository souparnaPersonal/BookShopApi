import { TBook } from './product.interface';
import { Book } from './product.model';

const createBook = async (book: TBook) => {
  const result = await Book.create(book);
  return result;
};

const getAllBook = async () => {
  const result = await Book.find();
  return result;
};

const getSingleBook = async (id: string) => {
  const result = await Book.findById({
    _id: Object(id),
  });
  return result;
};

const updateSpecificBook = async (id: string, updatedFields: any) => {
  const result = await Book.findByIdAndUpdate(
    { _id: Object(id) },
    {
      $set: updatedFields,
    },
  );
  console.log(result);
  return result;
};
export const productServices = {
  createBook,
  getAllBook,
  getSingleBook,
  updateSpecificBook,
};
