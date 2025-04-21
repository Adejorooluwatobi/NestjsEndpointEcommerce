//import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerParams, UpdateCustomerParams } from 'src/utils/types';
import { Profile } from 'src/database/entities/Profile.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/database/entities/customers.entity';
import { Card, CustomerAddress, Order } from 'src/database/entities';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
        @InjectRepository(CustomerAddress) private customerAddressRepository: Repository<CustomerAddress>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Card) private cardRepository: Repository<Card>,
        ) {}

    findCustomer() {
        // Logic to find all customers
        return this.customerRepository.find({ relations: ['profile'] }); // Fetch customers with their profiles
    }

    findCustomerById(id: string) {
        // Logic to find a customer by ID
        return this.customerRepository.findOne({ where: { id }, relations: ['profile'] }); // Fetch customer with their profile
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

    // async findCustomerByEmail(email: string) {
    //     // Logic to find a customer by email
    //     return this.customerRepository.findOne({ 
    //       where: { email },
    //       relations: ['profile', 'posts']
    //     });
    //   }
    async findCustomerByEmail(email: string): Promise<Customer | null> {
        try {
            return await this.customerRepository.findOneBy({ email });
        } catch (error) {
            console.error('Error finding customer by email:', error);
            throw new InternalServerErrorException('Database error occurred while finding customer');
        }
    }

    }