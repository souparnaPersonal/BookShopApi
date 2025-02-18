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
  } catch (error: any) {
    console.log('from createBsfddsook', error);

    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error,
    });
  }
};

const getAllBook = async (req: Request, res: Response) => {
  try {
    const { searchTerm, category } = req.query;
    console.log('from controllehhhr', req.cookies);
    const result = await productServices.getAllBooks(req.query);

    res.status(200).json({
      message: 'Books retrieved successfully',
      status: true,
      data: result.result,
      meta: result.meta,
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
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      message: 'Validation faild',
      success: false,
      error: error.message,
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
    res.status(404).json({
      message: 'Something went wrong',
      status: true,
      error,
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
  } catch (error: any) {
    res.status(400).json({
      message: 'Something went wrong',
      status: false,
      error: error.message,
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
