import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload.types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number | null => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    if (!user) {
      return null;
    }
    return user.userId;
  },
);
export default GetCurrentUserId;
