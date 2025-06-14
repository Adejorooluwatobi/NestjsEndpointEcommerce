import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/security/auth/guards/user.guard';
import { StaffGuard } from 'src/security/auth/guards';
import { StaffAccountsService } from 'src/Services/staff-accounts/staff-accounts.service';
import { CreateStaffAccountDto } from 'src/DTOs/StaffAccountDTO/CreateStaffAccount.dto';
import { UpdateStaffAccountDto } from 'src/DTOs/StaffAccountDTO/UpdateStaffAccount.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, StaffAccountsResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(StaffAccountsResponseDto)
@Controller('staff-accounts')
export class StaffAccountsController {
    constructor(private staffsService: StaffAccountsService) {}

    @UseGuards(UserGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all staff account' })
        @ApiOkResponse({
            description: 'Staff Account retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(StaffAccountsResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getStaffs() {
        const staff = await this.staffsService.findStaffAccount();
        return {
            succeeded: true,
            message: 'Staff Accounts retrieved successfully',
            statusCode: 200,
            resultData: staff,
        };
    }

    @UseGuards(StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get staff account by ID' })
        @ApiOkResponse({
            description: 'Staff Account retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(StaffAccountsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
                description: 'Staff account not found',
                type: ErrorResponseDto
            })
    @Get(':id')
    async getStaffById(@Param('id', ParseUUIDPipe) id: string) {
        const staff = await this.staffsService.findStaffAccountById(id);
        if (!staff) {
            throw new Error(`Staff account with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Staff Account retrieved successfully',
            statusCode: 200,
            resultData: staff,
        };
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Create a new staff account' })
        @ApiOkResponse({
            description: 'Staff Account created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(StaffAccountsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    @Post()
    async createStaff(@Body() createStaffDto: CreateStaffAccountDto) {
        const staff = await this.staffsService.createStaffAccount(createStaffDto);
        return {
            succeeded: true,
            message: 'Staff Account created successfully',
            statusCode: 201,
            resultData: staff,
        };
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update staff account by ID' })
        @ApiOkResponse({
            description: 'Staff Account updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(StaffAccountsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Staff account not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    @Put(':id')
    async updateStaffById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateStaffDto: UpdateStaffAccountDto,) {
            const staff = await this.staffsService.updateStaffAccount(id, updateStaffDto);
            if (!staff) {
                throw new Error(`Staff account with ID ${id} not found`);
            }
            return {
                succeeded: true,
                message: 'Staff Account updated successfully',
                statusCode: 200,
                resultData: staff,
            };
    }

    
    @UseGuards(UserGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteStaffById(
        @Param('id', ParseUUIDPipe) id: string) {
        const result = await this.staffsService.deleteStaffAccount(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'staff Account deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}