import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { JwtPayload } from '../types/jwt-payload.types';
import { JwtPayLoadWithRefreshToken } from '../types/jwt-payload-&-refresh-token';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: JwtPayload): JwtPayLoadWithRefreshToken {
    const refreshToken = request
      ?.get('Authorization')
      ?.replace('Bearer ', '')
      .trim();
    if (!refreshToken) throw new ForbiddenException('Refresh token not found');
    return { ...payload, refreshToken };
  }
}
