//import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerParams, UpdateCustomerParams } from 'src/utils/types';
import { Profile } from 'src/database/entities/Profile.entity';
import { Post } from 'src/database/entities/Post.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/database/entities/customers.entity';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
        ) {}

    findCustomer() {
        // Logic to find all customers
        return this.customerRepository.find({ relations: ['profile', 'posts'] }); // Fetch customers with their profiles
    }

    findCustomerById(id: string) {
        // Logic to find a customer by ID
        return this.customerRepository.findOne({ where: { id }, relations: ['profile', 'posts'] }); // Fetch customer with their profile
    }

    async createCustomer(customerDetails: CreateCustomerParams) {
        if (!customerDetails.email) {
            throw new Error('Email is required');
        }
        const existingCustomer = await this.customerRepository.findOneBy({ email: customerDetails.email });
    if (existingCustomer) {
        throw new ConflictException(`Customer with this ${customerDetails.email} already exists`);
    }
        // Logic to create a new customer
        const hashedPassword = await bcrypt.hash(customerDetails.password, 10); // Hash the password
        const newCustomer = this.customerRepository.create({ ...customerDetails, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() });
        const savedCustomer = await this.customerRepository.save(newCustomer);
        console.log(`Customer created successfully with ID: ${savedCustomer.id}`);
        return savedCustomer;
    }

    async updateCustomer( id: string, updateCustomerDetails: UpdateCustomerParams) {

        updateCustomerDetails.password = await bcrypt.hash(updateCustomerDetails.password, 10);
        // Logic to update an customer
        return this.customerRepository.update(id, { ...updateCustomerDetails, updatedAt: new Date() });
    }

    deleteCustomer(id: string) {
        // Logic to delete an customer by ID
        return this.customerRepository.delete(id);
    }

    async findCustomerByEmail(email: string) {
        // Logic to find a customer by email
        return this.customerRepository.findOne({ 
          where: { email },
          relations: ['profile', 'posts']
        });
      }

    }