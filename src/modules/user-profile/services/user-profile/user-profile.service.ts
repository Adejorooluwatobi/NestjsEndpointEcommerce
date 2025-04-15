import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/User.entity';
import { Profile } from 'src/database/entities/Profile.entity';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { Customer } from 'src/database/entities';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createUserProfile(
    id: string,
    createUserProfileDetails: CreateUserProfileDto,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found, Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async getUserProfile(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.profile;
  }

  async createCustomerProfile(
    id: string,
    createCustomerProfileDetails: CreateUserProfileDto,
  ) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new HttpException(
        'Customer not found, Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProfile = this.profileRepository.create(createCustomerProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    customer.profile = savedProfile;
    return this.customerRepository.save(customer);
  }

  async getCustomerProfile(id: string) {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return customer.profile;
  }
}