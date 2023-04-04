import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(private userService: UserService) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: 'my really secret key does not let oters to login',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies?.['auth-cookie'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  async validate(request: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('Invalid token');
    }
    const data = request?.cookies?.['auth-cookie'];
    if (!data?.refreshToken) {
      throw new BadRequestException('Invalid refresh token');
    }
    const user = await this.userService.validRefreshToken(
      payload.email,
      data.refreshToken,
    );
    if (!user) {
      throw new BadRequestException('token expired');
    }
    return user;
  }
}
