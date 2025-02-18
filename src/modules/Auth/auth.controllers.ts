/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { authServices } from './auth.services';
import catchAsync from '../../app/utils/catchAsynch';
import sendRespones from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../app/config';
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.createUserIntoDb(req.body);
  const { token, user } = result;

  sendRespones(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created',
    data: {
      token,
      user,
    },
  });
});
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  try {
    const result = await authServices.loginUser(req.body);
    const { token, refreshToken } = result;
    console.log(refreshToken);
    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: {
        token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const authController = {
  createUser,
  loginUser,
};
