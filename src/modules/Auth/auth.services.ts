import config from '../../app/config';
import { createToken } from '../../constant/createToken';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';

const createUserIntoDb = async (payload: Partial<TUser>) => {
  const result = await User.create(payload);
  const user = {
    email: result.email,
    name: result.name,
    _id: result._id,
    // role: result.role,
  };
  const jwtPayload = {
    userID: result._id,
    email: result.email,
    role: result.role,
  };
  const token = createToken(jwtPayload, config.jwt_secret as string);

  return {
    user,
    token,
  };
};

const loginUser = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('user not found');
  }

  console.log(user);
  const passwordMatched = await bcrypt.compare(payload.password, user.password);

  if (!passwordMatched) {
    throw new Error('Password not matched');
  }
  const jwtPayload = {
    userID: user._id,
    email: user.email,
    role: user.role,
  };
  const token = createToken(jwtPayload, config.jwt_secret as string);
  const refreshToken = createToken(jwtPayload, config.jwt_refresh as string);

  return {
    token,
    refreshToken,
  };
};
export const authServices = {
  createUserIntoDb,
  loginUser,
};
