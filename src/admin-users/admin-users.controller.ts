import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { QueryAdminUsersDto } from './dto/query-admin-users.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller(['users', 'admin/users', 'admin-users']) // 🟢 BISA MENERIMA SEMUA VARIASI RUTE
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  findAll(@Query() query: QueryAdminUsersDto) {
    return this.adminUsersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminUsersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAdminUserDto) {
    return this.adminUsersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUsersService.remove(id);
  }
}