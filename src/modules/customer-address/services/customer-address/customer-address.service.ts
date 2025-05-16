import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer, CustomerAddress} from 'src/database/entities';
import { CreateCustomerAddressParams, UpdateCustomerAddressParams } from 'src/utils/types';

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(CustomerAddress) private customerAddressRepository: Repository<CustomerAddress>,
  ) {}

  async createCustomerAddress(
    id: string,
    createCustomerAddressDetails: CreateCustomerAddressParams,
  ) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new HttpException(
        'Customer not found, Cannot create customerAddress',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCustomerAddress = this.customerAddressRepository.create(createCustomerAddressDetails);
    const savedCustomerAddress = await this.customerAddressRepository.save(newCustomerAddress);
    customer.customerAddress = savedCustomerAddress;
    return this.customerRepository.save(customer);
  }

  async getCustomerAddress(id: string) {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['customerAddress'],
    });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return customer.customerAddress;
  }


  async updateCustomerAddress(id: string, updateCustomerAddress: UpdateCustomerAddressParams){
    return this.customerRepository.update(id, {...updateCustomerAddress})
  }
}