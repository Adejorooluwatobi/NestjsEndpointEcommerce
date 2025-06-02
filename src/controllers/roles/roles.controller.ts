import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { RolesService } from '../../Services/roles/roles.service';
import { CreateRoleDto } from '../../DTOs/RolesDTO/CreateRoles.dto';
import { UpdateRoleDto } from '../../DTOs/RolesDTO/UpdateRoles.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, RolesResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(CreateRoleDto, UpdateRoleDto, RolesResponseDto)
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new roles' })
        @ApiCreatedResponse({
            description: 'Roles created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(RolesResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createRole(@Body() createRoleDto: CreateRoleDto) {
        const role = await this.roleService.createRole(createRoleDto)
        return {
            succeeded: true,
            message: 'Role created successfully',
            statusCode: 201,
            resultData: role,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all roles' })
        @ApiOkResponse({
            description: 'Roles retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(RolesResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getRole() {
        const role = await this.roleService.findRole();
        return {
            succeeded: true,
            message: 'Roles retrieved successfully',
            statusCode: 200,
            resultData: role,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get role by ID' })
        @ApiOkResponse({
            description: 'Roles retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(RolesResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Roles not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getRoleById(@Param('id', ParseUUIDPipe) id: string) {
        const role = await this.roleService.findRoleById(id);
        if (!role) {
            throw new Error(`Role with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Role retrieved successfully',
            statusCode: 200,
            resultData: role,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get role by ID' })
        @ApiOkResponse({
            description: 'Role retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(RolesResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Role not found',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateRoleById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateRoleDto: UpdateRoleDto,) {
            const role = await this.roleService.updateRole(id, UpdateRoleDto);
            if (!role) {
                throw new Error(`Role with ID ${id} not found`);
            }
            return {
                succeeded: true,
                message: 'Role updated successfully',
                statusCode: 200,
                resultData: role,
            };
        }
    
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteRoleById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        const result = await this.roleService.deleteRole(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Roles deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}
