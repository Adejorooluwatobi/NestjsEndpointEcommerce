import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStaffParams, UpdateStaffParams } from 'src/utils/types';
import * as bcrypt from 'bcrypt';
import { StaffAccount } from 'src/database/entities/staffAccounts.entity';
import { Profile } from 'src/database/entities/Profile.entity';
import { StaffRole } from 'src/database/entities';

@Injectable()
export class StaffAccountsService {

    constructor(
        @InjectRepository(StaffAccount) private staffRepository: Repository<StaffAccount>,
        @InjectRepository(StaffRole) private staffRoleRepository: Repository<StaffRole>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    ) {}

    findStaffAccount() {
        return this.staffRepository.find({relations: ['staffRole', 'profile']});
    }

    findStaffAccountById(id: string) {
        return this.staffRepository.findOne({ where: { id }, relations: ['staffRole', 'profile'] });
    }

    async createStaffAccount(staffDetails: CreateStaffParams) {
        if (!staffDetails.email) {
            throw new Error('Email is required');
        }
        const existingStaff = await this.staffRepository.findOneBy({ email: staffDetails.email });
        if (existingStaff) {
            throw new ConflictException(`Staff with this ${staffDetails.email} already exists`)
        }
        const hashedPassword = await bcrypt.hash(staffDetails.password, 10);
        const newStaff = this.staffRepository.create({ ...staffDetails, password: hashedPassword, registeredAt: new Date(), updatedAt: new Date() });
        const savedStaff = await this.staffRepository.save(newStaff);
        console.log(`Staff created successfully with ID: ${savedStaff.id}`);
        return savedStaff;
    }

    async updateStaffAccount( id: string, updateStaffDetails: UpdateStaffParams) {
    
            updateStaffDetails.password = await bcrypt.hash(updateStaffDetails.password, 10);
            // Logic to update an staff
            return this.staffRepository.update(id, { ...updateStaffDetails, updatedAt: new Date() });
        }
    
        deleteStaffAccount(id: string) {
            // Logic to delete an staff by ID
            return this.staffRepository.delete(id);
        }
    
        async findStaffByEmail(email: string): Promise<StaffAccount | null> {
                try {
                    return await this.staffRepository.findOneBy({ email });
                } catch (error) {
                    console.error('Error finding staff by email:', error);
                    throw new InternalServerErrorException('Database error occurred while finding staff');
                }
            }

}
