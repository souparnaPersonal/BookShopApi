import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';
export const verifyToken = (token: string) => {
  let withoutBearer = '';
  if (token.startsWith('Bearer ')) {
    withoutBearer = token.split(' ')[1]; //
  }

  const decoded = jwt.verify(
    withoutBearer,
    config.jwt_secret as string,
  ) as JwtPayload;

  return decoded;
};
