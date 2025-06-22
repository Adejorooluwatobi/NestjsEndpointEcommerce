import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult,  } from 'typeorm'; // Import DeleteResult and UpdateResult for method signatures
import { CreateCustomerParams, UpdateCustomerParams } from 'src/utils/types';
import { Profile } from 'src/database/entities/Profile.entity';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'; // Added NotFoundException
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/database/entities/customers.entity';
import { EmailVerificationService } from '../EmailVerification/emailVerification.service';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer) private customerRepository: Repository<Customer>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        private emailVerificationService: EmailVerificationService,
    ) {}

    /**
     * Finds all customers, optionally with their profiles.
     * @returns A promise that resolves to an array of Customer entities.
     */
    findCustomer(): Promise<Customer[]> {
        return this.customerRepository.find({ relations: ['profile'] });
    }

    /**
     * Finds a customer by their ID, optionally with their profile.
     * @param id The UUID of the customer.
     * @returns A promise that resolves to a Customer entity or null if not found.
     */
    findCustomerById(id: string): Promise<Customer | null> {
        return this.customerRepository.findOne({ where: { id }, relations: ['profile'] });
    }

    /**
     * Creates a new customer profile.
     * Hashes the password and checks for existing email.
     * @param customerDetails The data to create the customer.
     * @returns A promise that resolves to the newly created Customer entity.
     * @throws ConflictException if a customer with the given email already exists.
     * @throws InternalServerErrorException for unexpected errors during hashing or saving.
     */
    async createCustomer(customerDetails: CreateCustomerParams): Promise<Customer> {
        if (!customerDetails.email) {
            // This check might be redundant if ValidationPipe is used in controller with DTO validation
            throw new InternalServerErrorException('Email is required');
        }

        const existingCustomer = await this.customerRepository.findOneBy({ email: customerDetails.email });
        if (existingCustomer) {
            throw new ConflictException(`Customer with this email (${customerDetails.email}) already exists`);
        }

        try {
            const hashedPassword = await bcrypt.hash(customerDetails.password, 10);
            const newCustomer = this.customerRepository.create({
                ...customerDetails,
                password: hashedPassword,
                isActive: false, // Customer starts as inactive until email is verified
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const savedCustomer = await this.customerRepository.save(newCustomer);
            // Send verification email
            await this.emailVerificationService.createAndSendVerificationCode(customerDetails.email);
            console.log(`Customer created successfully with ID: ${savedCustomer.id}`);
            return savedCustomer;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw new InternalServerErrorException('Failed to create customer due to an internal error.');
        }
    }

    /**
     * Verifies customer email and activates account
     * @param email Customer email
     * @param verificationCode Verification code
     * @returns Promise<Customer> Activated customer
     */
    async verifyCustomerEmail(email: string, verificationCode: string): Promise<Customer> {
        // Find customer by email
        const customer = await this.customerRepository.findOneBy({ email });
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        if (customer.isActive) {
            throw new BadRequestException('Customer account is already verified and active');
        }

        // Verify the code
        const isCodeValid = await this.emailVerificationService.verifyCode(email, verificationCode);
        
        if (!isCodeValid) {
            throw new BadRequestException('Invalid or expired verification code');
        }

        // Activate customer account
        customer.isActive = true;
        customer.updatedAt = new Date();
        
        try {
            const updatedCustomer = await this.customerRepository.save(customer);
            console.log(`Customer ${email} verified and activated successfully`);
            return updatedCustomer;
        } catch (error) {
            console.error('Error activating customer:', error);
            throw new InternalServerErrorException('Failed to activate customer account');
        }
    }

    /**
     * Resends verification code to customer email
     * @param email Customer email
     */
    async resendVerificationCode(email: string): Promise<{ verificationCode: string, resentAt: Date, expiresInMinutes: number }> {
        // Check if customer exists
        const customer = await this.customerRepository.findOneBy({ email });
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        if (customer.isActive) {
            throw new BadRequestException('Customer account is already verified and active');
        }

        // Resend verification code and return the result
        const result = await this.emailVerificationService.resendVerificationCode(email);
        console.log(`Verification code resent to ${email}`);
        return result;
    }


    /**
     * Updates an existing customer profile.
     * Hashes the new password if provided and checks for email conflicts.
     * @param id The UUID of the customer to update.
     * @param updateCustomerDetails The data to update the customer.
     * @returns A promise that resolves to the updated Customer entity.
     * @throws NotFoundException if the customer with the given ID is not found.
     * @throws ConflictException if the updated email already exists for another customer.
     * @throws InternalServerErrorException for unexpected errors during hashing or saving.
     */
    async updateCustomer(id: string, updateCustomerDetails: UpdateCustomerParams): Promise<Customer> {
        const customerToUpdate = await this.customerRepository.findOneBy({ id });
        if (!customerToUpdate) {
            throw new NotFoundException(`Customer with ID ${id} not found.`);
        }

        // Check for email conflict if email is being updated and is different from current
        if (updateCustomerDetails.email && updateCustomerDetails.email !== customerToUpdate.email) {
            const existingCustomerWithNewEmail = await this.customerRepository.findOneBy({ email: updateCustomerDetails.email });
            if (existingCustomerWithNewEmail && existingCustomerWithNewEmail.id !== id) {
                throw new ConflictException('Another customer with this email already exists.');
            }
        }

        if (updateCustomerDetails.password) {
            updateCustomerDetails.password = await bcrypt.hash(updateCustomerDetails.password, 10);
        }

        try {
            // Merge the existing customer with the update details
            this.customerRepository.merge(customerToUpdate, { ...updateCustomerDetails, updatedAt: new Date() });
            return await this.customerRepository.save(customerToUpdate);
        } catch (error) {
            console.error('Error updating customer:', error);
            throw new InternalServerErrorException('Failed to update customer due to an internal error.');
        }
    }

    /**
     * Deletes a customer profile by ID.
     * @param id The UUID of the customer to delete.
     * @returns A promise that resolves when the customer is deleted.
     * @throws NotFoundException if the customer with the given ID is not found.
     * @throws InternalServerErrorException for unexpected database errors.
     */
    async deleteCustomer(id: string): Promise<void> {
        try {
            const result: DeleteResult = await this.customerRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Customer with ID ${id} not found.`);
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Re-throw NotFoundException
            }
            console.error('Error deleting customer:', error);
            throw new InternalServerErrorException('Failed to delete customer due to an internal error.');
        }
    }

    /**
     * Finds a customer by their email.
     * @param email The email of the customer.
     * @returns A promise that resolves to a Customer entity or null if not found.
     * @throws InternalServerErrorException for database errors.
     */
    async findCustomerByEmail(email: string): Promise<Customer | null> {
        try {
            return await this.customerRepository.findOneBy({ email });
        } catch (error) {
            console.error('Error finding customer by email:', error);
            throw new InternalServerErrorException('Database error occurred while finding customer');
        }
    }

    private generateVerificationCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    }
}