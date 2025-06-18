import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StaffRolesService } from '../../Services/staff-roles/staff-roles.service';
import { CreateStaffRoleDto } from '../../DTOs/StaffRoleDTO/CreateStaffRoles.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, StaffRolesResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { UserGuard } from 'src/security/auth/guards';

@ApiExtraModels(StaffRolesResponseDto)
@Controller('staff-roles')
export class StaffRolesController {
    constructor(private readonly staffRoleService: StaffRolesService) {}

    @UseGuards(UserGuard)
    @Post()
     @ApiOperation({ summary: 'Create a new staff role' })
        @ApiCreatedResponse({
            description: 'Staff Role created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(StaffRolesResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createStaffRole(@Body() createStaffRoleDto: CreateStaffRoleDto) {
        const staffRole = await this.staffRoleService.createStaffRole(createStaffRoleDto)
        return {
            succeeded: true,
            message: 'Staff Role created successfully',
            statusCode: 201,
            resultData: staffRole,
        };
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all staff Role' })
        @ApiOkResponse({
            description: 'Staff Role retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(StaffRolesResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getStaffRole() {
        const staffRole = await this.staffRoleService.findStaffRole();
        return {
            succeeded: true,
            message: 'Staff Roles retrieved successfully',
            statusCode: 200,
            resultData: staffRole,
        };
    }
}
