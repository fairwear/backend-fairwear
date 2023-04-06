import * as dotenv from 'dotenv';

dotenv.config();
export const jwtConstants = {
  secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secretKey',
  refresh: process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshKey',
};
