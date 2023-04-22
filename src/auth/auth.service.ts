/* eslint-disable prefer-const */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';
import { LoginRequestDto } from './dto/request/login-request.dto';
import { JwtPayload } from './types/jwt-payload.types';
import { Tokens } from './types/tokens.types';

dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return argon2.hash(password, {
      hashLength: 24,
    });
  }

  async hash(token: string) {
    return argon2.hash(token, {
      hashLength: 36,
    });
  }

  async signUp(request: any): Promise<Tokens> {
    const user = request.user;
    const isUserAdmin = await this.isUserAdminByName(user.username);

    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      isAdmin: isUserAdmin ? true : false,
      isLoggedIn: true,
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  async login(request: any) {
    const user = request.user;
    const isUserAdmin = await this.isUserAdminByName(user.username);

    const payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      isAdmin: isUserAdmin ? true : false,
      isLoggedIn: true,
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
    return true;
  }

  async isUserAdmin(userId: number) {
    return await this.userService.isUserAdmin(userId);
  }

  async isUserAdminByName(username: string) {
    return await this.userService.isUserAdminByName(username);
  }

  async isUserLoggedIn(accessToken?: string) {
    if (accessToken) {
      const isLoggedIn = await this.jwtService
        .verifyAsync(accessToken, {
          secret: jwtConstants.secret,
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      if (isLoggedIn && isLoggedIn.isLoggedIn && isLoggedIn.userId !== null) {
        return true;
      }
    }
    return false;
  }
  async isLoggedIn(request: Request) {
    const accessToken = request.headers['authorization']?.split(' ')[1];
    if (accessToken) {
      const isLoggedIn = await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.secret,
      });
      if (isLoggedIn) {
        return true;
      }
    }
    return false;
  }

  getUserFromRequest = async (request: Request) => {
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Unauthorized');
    }
    const accessToken = request.headers.authorization.split(' ')[1];
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const user: JwtPayload = await this.jwtService.verifyAsync(accessToken, {
      secret: secret,
    });
    if (!user || !user.userId || !user.isLoggedIn) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  };
  userAuthValidation = async (request: Request) => {
    let isUserLoggedIn = await this.isLoggedIn(request);
    if (!isUserLoggedIn) {
      throw new UnauthorizedException('Unauthorized');
    }
    let jwtPayload = await this.getUserFromRequest(request);
    if (!jwtPayload) {
      throw new UnauthorizedException('Unauthorized');
    }
    return jwtPayload;
  };
  async validateUser(request: LoginRequestDto): Promise<User> {
    let user = await this.userService.findByUsername(request.username);
    if (!user) {
      throw new NotFoundException(`
      User with username: ${request.username} not found.
      `);
    }
    let isPasswordValid = await argon2.verify(user.password, request.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Wrong username or password');
    }
    return user;
  }

  async validate(request: Request) {
    let user = await this.getUserFromRequest(request);
    return user;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('User not found');
    }
    let isRefreshTokenValid = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Access denied');
    }
    let payload = this.getPayloadFromUser(user);
    let tokens = await this.getTokens(await payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    let hash = await this.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  async getTokens(payload: JwtPayload): Promise<Tokens> {
    let [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: 60 * 60, // 1 hour
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.refresh,
        expiresIn: 60 * 60 * 24 * 14, //14 days
      }),
    ]);
    let tokens: Tokens = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return tokens;
  }
  async getPayloadFromUser(user: User): Promise<JwtPayload> {
    let isLoggedIn = user.refreshToken ? true : false;
    let isAdmin = await this.isUserAdminByName(user.username);

    let payload: JwtPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      isAdmin: isAdmin ? true : false,
      isLoggedIn: isLoggedIn,
    };
    return payload;
  }
}
