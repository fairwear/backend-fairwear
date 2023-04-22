import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { JwtPayload } from '../types/jwt-payload.types';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secret: jwtConstants.secret,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
