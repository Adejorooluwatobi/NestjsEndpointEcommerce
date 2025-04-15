import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateProfileDto } from '../../dtos/CreateProfile.dto';
import { ProfileService } from '../../services/profile/profile.service';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('users/:id/profiles')
  createUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createUserProfile(id, createProfileDto);
  }

  @Get('users/:id/profiles')
  getUserProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.getUserProfile(id.toString());
  }

  @Post('customers/:id/profiles')
  createCustomerProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCustomerProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createCustomerProfile(id, createCustomerProfileDto);
  }

  @Get('customers/:id/profiles')
  getCustomerProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.getCustomerProfile(id.toString());
  }
}