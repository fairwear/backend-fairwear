import { ConflictException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Strategy } from 'passport-local';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class SignUpStrategy extends PassportStrategy(Strategy, 'signup') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      nameField: 'name',
      surnameField: 'surname',
      emailField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(request: any): Promise<any> {
    const hash = await this.authService.hashPassword(request.body.password);
    const user = await this.userService
      .create({
        username: request.body.username,
        password: hash,
        name: request.body.name,
        surname: request.body.surname,
        email: request.body.email,
        id: 0,
        roles: [],
        refreshToken: null,
        createdAt: request.body.createdAt,
        updatedAt: request.body.updatedAt,
        deletedAt: request.body.deletedAt,
        userTrustScore: 0.5,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ConflictException('User already exists');
          }
        }
        throw new Error(error);
      });
    return user;
  }
}
