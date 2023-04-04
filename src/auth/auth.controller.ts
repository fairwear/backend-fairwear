import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import GetCurrentUserId from './decorators/get-current-user-id.decorator';
import GetCurrentUser from './decorators/get-current-user.decorator';
import Public from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local.guard';
import RefreshTokenGuard from './guards/refresh-token.guard';
import { SignUpGuard } from './guards/signUp.guard';
import { Tokens } from './types';
@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @UseGuards(SignUpGuard)
  signup(@Req() request: Request): Promise<Tokens> {
    return this.authService.signUp(request);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request) {
    return this.authService.login(request);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() request: Request) {
    return request.user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    if (!userId) {
      return Promise.resolve(false);
    }
    return this.authService.logout(userId);
  }

  @Public()
  @Get('status')
  async getStatus(@Req() request: Request) {
    if (request.headers.authorization) {
      const accessToken = request.headers.authorization.split(' ')[1];
      const isLoggedIn = await this.authService.isUserLoggedIn(accessToken);
      return { isLoggedIn: isLoggedIn };
    }
    return { isLoggedIn: false };
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
