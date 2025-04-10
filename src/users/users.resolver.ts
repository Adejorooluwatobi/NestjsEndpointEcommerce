import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../database/entities/User';
import { UsersService } from './services/users/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findUser(): Promise<User[]> {
    return this.usersService.findUser();
  }
}