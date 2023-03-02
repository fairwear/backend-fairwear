import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/request/create-user.dto';
import { UpdateUserRequest } from './dto/request/update-user.dto';
import { UserMapper } from '../user/mapper/user.mapper';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() request: CreateUserRequest) {
    const entity = UserMapper.toEntity(request);
    const createdEntity = await this.userService.create(entity);
    return UserMapper.toResponse(createdEntity);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserRequest) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
