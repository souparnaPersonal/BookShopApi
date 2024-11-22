import { Request, Response } from 'express';
import { orerServices } from './order.services';

const orderAProduct = async (req: Request, res: Response) => {
  try {
    const result = await orerServices.orderAProduct(req.body);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error,
    });
  }
};

const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orerServices.calculateTotalRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Validation faild',
      success: false,
      error,
    });
  }
};

export const orderController = {
  orderAProduct,
  calculateTotalRevenue,
};
