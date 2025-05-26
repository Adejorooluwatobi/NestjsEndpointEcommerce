import { Body, Controller, Get, Post } from '@nestjs/common';
import { StaffRolesService } from '../../Services/staff-roles/staff-roles.service';
import { CreateStaffRoleDto } from '../../DTOs/StaffRoleDTO/CreateStaffRoles.dto';

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
