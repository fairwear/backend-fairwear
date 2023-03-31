import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayLoadWithRefreshToken } from '../types/jwt-payload-&-refresh-token';

export const GetCurrentUser = createParamDecorator(
  (
    data: keyof JwtPayLoadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
export default GetCurrentUser;
