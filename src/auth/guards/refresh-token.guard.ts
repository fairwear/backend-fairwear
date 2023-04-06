import { AuthGuard } from '@nestjs/passport';
export class RefreshTokenGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
export default RefreshTokenGuard;
