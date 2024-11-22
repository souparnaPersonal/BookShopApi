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
    const { searchTerm } = req.query;
    console.log(searchTerm);
    const result = await productServices.getAllBooks(searchTerm);
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

const getSingleBook = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getSingleBook(req.params.productId);
    res.status(200).json({
      message: 'Book retrieved successfully',
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

const updateSpecificBook = async (req: Request, res: Response) => {
  try {
    const result = await productServices.updateSpecificBook(
      req.params.productId,
      req.body,
    );
    res.status(200).json({
      message: 'Book updated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      status: true,
      data: error,
    });
  }
};

const deleteAbook = async (req: Request, res: Response) => {
  try {
    await productServices.deleteAbook(req.params.productId);
    res.status(200).json({
      message: 'Book deleted successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      status: true,
      data: error,
    });
  }
};
export const bookControllers = {
  createBook,
  getAllBook,
  getSingleBook,
  updateSpecificBook,
  deleteAbook,
};
