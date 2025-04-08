import { Resolver, Query } from '@nestjs/graphql';
import { CustomersService } from './services/customers/customers.service';
import { Customer } from 'src/database/entities/customers';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private customersService: CustomersService) {}

  @Query(() => [Customer], { name: 'customers' })
  async findCustomer(): Promise<Customer[]> {
    return this.customersService.findCustomer();
  }
}