import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../Services/users/users.service';
import { CreateUserDto } from '../../DTOs/UserDTO/CreateUser.dto'; // Adjust the import path as necessary
import { UpdateUserDto } from '../../DTOs/UserDTO/UpdateUser.dto';
import { UserGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, UserResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';


@ApiExtraModels(UserResponseDto)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({
        description: 'Users retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: {
                            type: 'array',
                            items: { $ref: getSchemaPath(UserResponseDto) }
                        }
                    }
                }
            ]
        }
    })
    async getUsers() {
        const users = await this.usersService.findUser();
        return {
            succeeded: true,
            message: 'Users retrieved successfully',
            statusCode: 200,
            resultData: users,
        };
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiOkResponse({
        description: 'User retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(UserResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiNotFoundResponse({
        description: 'User not found',
        type: ErrorResponseDto
    })
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        const user = await this.usersService.findUserById(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'User retrieved successfully',
            statusCode: 200,
            resultData: user,
        };
    }

    @Post()
    @ApiOperation({ summary: 'Create a new User Record' })
    @ApiCreatedResponse({
        description: 'User created successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(UserResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data',
        type: ErrorResponseDto
    })
    @ApiConflictResponse({
        description: 'User with this email already exists'
    })
    async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        // Logic to create a new user
        const user = await this.usersService.createUser(createUserDto);
        if (!user) {
            throw new Error('User with this email already exists');
        }
        return {
            succeeded: true,
            message: 'User created successfully',
            statusCode: 201,
            resultData: user,
        };
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiOkResponse({
        description: 'User updated successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(UserResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiNotFoundResponse({ description: 'User not found', type: ErrorResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
    async updateUserById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,) {
        const user = await this.usersService.updateUser(id, updateUserDto);
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'User updated successfully',
            statusCode: 201,
            resultData: user,
        };
    }


    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiOkResponse({ description: 'User deleted successfully' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async deleteUserById(
        @Param('id', ParseUUIDPipe) id: string) {
        // Logic to delete an user by ID
        await this.usersService.deleteUser(id);
    }

}
