import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserRoleService } from '../user-role/user-role.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { SignUpStrategy } from './strategies/signup.strategy';

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
