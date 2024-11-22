import { Request, Response } from 'express';
import { productServices } from './product.services';

const createBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const result = await productServices.createBook(book);
    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error,
    });
  }
};

const getAllBook = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllBook();
    res.status(200).json({
      message: 'Books retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error,
    });
  }
};

export const bookControllers = {
  createBook,
  getAllBook,
};
