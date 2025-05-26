import { Resolver, Query } from '@nestjs/graphql';
import { CustomersService } from '../../Services/customers/customers.service';
import { Customer } from 'src/database/entities/customers.entity';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private customersService: CustomersService) {}

  @Query(() => [Customer], { name: 'customers' })
  async findCustomer(): Promise<Customer[]> {
    return this.customersService.findCustomer();
  }
}