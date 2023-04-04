import { JwtPayload } from './jwt-payload.types';

export type JwtPayLoadWithRefreshToken = JwtPayload & {
  refreshToken: string;
};
