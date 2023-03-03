import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/request/create-user.dto';
import { UpdateUserRequest } from './dto/request/update-user.dto';
import { UserMapper } from '../user/mapper/user.mapper';
@Controller('user')
export class UserController {
  UserService: any;
  constructor(private readonly userService: UserService) {}

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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedEntity = await this.userService.delete(+id);
    return UserMapper.toResponse(deletedEntity);
  }
}
