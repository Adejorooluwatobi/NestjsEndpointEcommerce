//import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Profile } from 'src/database/entities/Profile.entity';
import { Post } from 'src/database/entities/Post.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
        ) {}

    findUser() {
        // Logic to find all users
        return this.userRepository.find({ relations: ['profile', 'posts'] }); // Fetch users with their profiles
    }

    findUserById(id: string) {
        // Logic to find a user by ID
        return this.userRepository.findOne({ where: { id }, relations: ['profile', 'posts'] }); // Fetch user with their profile
    }

    async createUser(userDetails: CreateUserParams) {
    // try {    
    if (!userDetails.email) {
        throw new Error('Email is required');
    }
        const existingUser = await this.userRepository.findOneBy({ email: userDetails.email });
    if (existingUser) {
        throw new ConflictException(`User with email ${userDetails.email} already exists`);
    }
        // Logic to create a new user
        const hashedPassword = await bcrypt.hash(userDetails.password, 10); // Hash the password
        const newUser = this.userRepository.create({ ...userDetails, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() });
        const savedUser = await this.userRepository.save(newUser);
        console.log(`User created successfully with ID: ${savedUser.id}`);
        return savedUser;
    // } catch (error) {
    //     console.error('Error creating user:', error);
    //     if (error.code === '23505') { // PostgreSQL unique constraint violation
    //         throw new ConflictException(`User with this email already exists`);
    //     }
    //     throw error;
    // }
    }

    async updateUser( id: string, updateUserDetails: UpdateUserParams) {

        updateUserDetails.password = await bcrypt.hash(updateUserDetails.password, 10);
        // Logic to update an user
        return this.userRepository.update(id, { ...updateUserDetails, updatedAt: new Date() });
    }

    deleteUser(id: string) {
        // Logic to delete an user by ID
        return this.userRepository.delete(id);
    }

    async findUserByEmail(email: string) {
        // Logic to find a user by email
        return this.userRepository.findOne({ 
          where: { email },
          relations: ['profile', 'posts']
        });
      }

    // async createProfile(
    //     id: string, // Changed type from number to string to match the User entity
    //     createProfileDetails: CreateProfileParams,
    // ) {
    //     // Logic to create a user profile
    //     const user = await this.userRepository.findOneBy({ id });
    //     if (!user) {
    //         throw new HttpException('User not found, Cannot create profile', HttpStatus.BAD_REQUEST);
    //     }

    //     const newProfile = this.profileRepository.create(createProfileDetails);
    //     const savedProfile = await this.profileRepository.save(newProfile);
    //     user.profile = savedProfile; // Associate the profile with the user
    //     return this.userRepository.save(user); // Save the updated user
    // }

    // async createPost(
    //     id: string, // Changed type from number to string to match the User entity
    //     createPostDetails: CreatePostParams,
    // ) {
    //     // Logic to create a user profile
    //     const user = await this.userRepository.findOneBy({ id });
    //     if (!user) {
    //         throw new HttpException('User not found, Cannot create profile', HttpStatus.BAD_REQUEST);
    //     }

    //     const newPost = this.postRepository.create({
    //         ...createPostDetails,
    //         user, 
    //     });
    //     return this.postRepository.save(newPost); // Save the new post
    // }
}
