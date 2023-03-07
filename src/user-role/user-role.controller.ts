import { Controller, Get, Param } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { RoleEnum } from '@prisma/client';

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

  @Get(':/role')
  async findByRole(@Param('role') role: RoleEnum) {
    return await this.userRoleService.findByRole(role);
  }

  @Get(':/name')
  async findByName(@Param('name') name: string) {
    return await this.userRoleService.findByName(name);
  }
}
