import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserRoleService } from '../user-role/user-role.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { SignUpStrategy } from './strategies/signUp.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    UserRoleModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    ConfigService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AccessTokenStrategy,
    SignUpStrategy,
    RefreshTokenStrategy,
    UserService,
    JwtService,
    UserRoleService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
