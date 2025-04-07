import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto'; // Adjust the import path as necessary
import { UpdateUserDto } from '../../../users/dtos/UpdateUser.dto';
import { UserGuard } from 'src/security/auth/guards';
// import { CreateUserProfileDto } from '../../../users/dtos/CreateUserProfile.dto'; // Adjust the import path as necessary
// import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(UserGuard)
    @Get()
    async getUsers() {
        // Logic to get all users
        // const users = await this.usersService.findUser();
        // return users; // Return the list of users
        return this.usersService.findUser(); // Assuming findUser returns a Promise
    }

    @UseGuards(UserGuard)
    @Get(':id')
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        // Logic to get a user by ID
        // const user = await this.usersService.findUserById(id);
        // return user; // Return the user details
        return this.usersService.findUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        // Logic to create a new user
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(UserGuard)
    @Put(':id')
    async updateUserById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateUserDto: UpdateUserDto,) {
            await this.usersService.updateUser(id, updateUserDto);
    }

    
    @UseGuards(UserGuard)
    @Delete(':id')
    async deleteUserById(
        @Param('id', ParseUUIDPipe) id: string) {
        // Logic to delete an user by ID
        await this.usersService.deleteUser(id);
    }

    // @Post(':id/profiles')
    // createUserProfile(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() createUserProfileDto: CreateUserProfileDto,
    // ) {
    //     return this.usersService.createUserProfile(id.toString(), createUserProfileDto);
    // }

    // @Post(':id/posts')
    // createUserPost(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() createUserPostDto: CreateUserPostDto,
    // ) {
    //     return this.usersService.createUserPost(id.toString(), createUserPostDto);
    // }
}
