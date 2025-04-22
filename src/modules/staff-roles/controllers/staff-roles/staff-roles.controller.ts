import { Body, Controller, Get, Post } from '@nestjs/common';
import { StaffRolesService } from '../../services/staff-roles/staff-roles.service';
import { CreateStaffRoleDto } from '../../dtos/CreateStaffRoles.dto';

@Controller('staff-roles')
export class StaffRolesController {
    constructor(private readonly staffRoleService: StaffRolesService) {}

    @Post()
    createStaffRole(@Body() createStaffRoleDto: CreateStaffRoleDto) {
        return this.staffRoleService.createStaffRole(createStaffRoleDto)
    }

    @Get()
    async getStaffRole() {
        return this.staffRoleService.findStaffRole();
    }
}
