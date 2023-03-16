import { Controller, Get, Param } from '@nestjs/common';
import { UserRoleService } from './user-role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  async findAll() {
    return await this.userRoleService.findAll();
  }

  @Get(':/id')
  async findById(@Param('id') id: number) {
    return await this.userRoleService.findById(id);
  }
}
