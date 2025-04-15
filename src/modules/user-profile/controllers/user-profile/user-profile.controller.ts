import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';

@Controller()
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post('users/:id/profiles')
  createUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userProfileService.createUserProfile(id, createUserProfileDto);
  }

  @Get('users/:id/profiles')
  getUserProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.userProfileService.getUserProfile(id.toString());
  }

  @Post('customers/:id/profiles')
  createCustomerProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userProfileService.createCustomerProfile(id, createUserProfileDto);
  }

  @Get('customers/:id/profiles')
  getCustomerProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.userProfileService.getCustomerProfile(id.toString());
  }
}