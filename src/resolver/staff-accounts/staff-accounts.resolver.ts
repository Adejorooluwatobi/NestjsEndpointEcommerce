import { Resolver, Query } from '@nestjs/graphql';
import { StaffAccountsService } from '../../Services/staff-accounts/staff-accounts.service';
import { StaffAccount } from 'src/database/entities/staffAccounts.entity';


@Resolver(() => StaffAccount)
export class StaffsResolver {
  constructor(private staffsService: StaffAccountsService) {}

  @Query(() => [StaffAccount], { name: 'staffAccounts' })
  async findStaff(): Promise<StaffAccount[]> {
    return this.staffsService.findStaffAccount();
  }
}