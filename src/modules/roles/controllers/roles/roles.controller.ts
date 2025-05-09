import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { RolesService } from '../../services/roles/roles.service';
import { CreateRoleDto } from '../../dtos/CreateRoles.dto';
import { UpdateRoleDto } from '../../dtos/UpdateRoles.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @Post()
    createRole(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto)
    }

    @Get()
    async getRole() {
        return this.roleService.findRole();
    }

    @Get(':id')
    async getRoleById(@Param('id', ParseUUIDPipe) id: string) {
        return this.roleService.findRoleById(id);
    }

    @Put(':id')
    async updateRoleById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateRoleDto: UpdateRoleDto,) {
            await this.roleService.updateRole(id, UpdateRoleDto);
        }
    
    @Delete(':id')
    async deleteRoleById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        await this.roleService.deleteRole(id);
    }
}
