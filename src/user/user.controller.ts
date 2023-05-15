import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import GetCurrentUserId from '../auth/decorators/get-current-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserMapper } from '../user/mapper/user.mapper';
import { CreateUserRequest } from './dto/request/create-user.dto';
import { UpdateUserRequest } from './dto/request/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @GetCurrentUserId() userId: number,
    @Body() request: CreateUserRequest,
  ) {
    const isUserAdmin = await this.authService.isUserAdmin(userId);
    if (!isUserAdmin)
      throw new UnauthorizedException(
        "You don't have permission to create user",
      );
    const entity = UserMapper.toEntity(request);
    const createdEntity = await this.userService.create(entity);
    return UserMapper.toResponse(createdEntity);
  }

  @Get()
  async findAll() {
    const entities = await this.userService.findAll();
    return UserMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entity = await this.userService.findById(+id);
    if (!entity) return null;
    return UserMapper.toResponse(entity);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() request: UpdateUserRequest,
  ) {
    const isUserAdmin = await this.authService.isUserAdmin(userId);
    if (!isUserAdmin) {
      throw new UnauthorizedException(
        "You don't have permission to update user",
      );
    }
    const entity = UserMapper.toEntity(request);
    const updateEntity = await this.userService.update(+id, entity);
    return UserMapper.toResponse(updateEntity);
  }

  @Get('/exists/usernameOrEmail/:usernameOrEmail')
  async existsByUsernameOrEmail(
    @Param('usernameOrEmail') usernameOrEmail: string,
  ) {
    return await this.userService.usernameOrEmailExists(usernameOrEmail);
  }

  @Get('/username/:username')
  async findByUsername(@Param('username') username: string) {
    return UserMapper.toUserInfoResponse(
      await this.userService.findByUsername(username),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    const isUserAdmin = await this.authService.isUserAdmin(userId);
    if (!isUserAdmin) {
      throw new UnauthorizedException(
        "You don't have permission to delete user",
      );
    }
    const deletedEntity = await this.userService.softDelete(+id);
    return UserMapper.toResponse(deletedEntity);
  }
}
