import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRoleService } from '../user-role/user-role.service';
import { UserMapper } from '../user/mapper/user.mapper';
import { CreateUserRequest } from './dto/request/create-user.dto';
import { UpdateUserRequest } from './dto/request/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private userRoleService: UserRoleService,
  ) {}
  @Post()
  async create(@Body() request: CreateUserRequest) {
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
  async update(@Param('id') id: string, @Body() request: UpdateUserRequest) {
    const entity = UserMapper.toEntity(request);
    const updateEntity = await this.userService.update(+id, entity);
    return UserMapper.toResponse(updateEntity);
  }

  // prie authorization reiks sito ----->> @Public()
  @Get('/exists/usernameOrEmail/:usernameOrEmail')
  async existsByUsernameOrEmail(
    @Param('usernameOrEmail') usernameOrEmail: string,
  ) {
    return await this.userService.usernameOrEmailExists(usernameOrEmail);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedEntity = await this.userService.softDelete(+id);
    return UserMapper.toResponse(deletedEntity);
  }
}
