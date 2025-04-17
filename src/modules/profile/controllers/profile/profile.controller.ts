import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from '../../dtos/CreateProfile.dto';
import { ProfileService } from '../../services/profile/profile.service';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(UserGuard, StaffGuard)
  @Post('users/:id/profiles')
  createUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createUserProfile(id, createProfileDto);
  }

  @UseGuards(UserGuard)
  @Get('users/:id/profiles')
  getUserProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.getUserProfile(id.toString());
  }

  @UseGuards(CustomerGuard)
  @Post('customers/:id/profiles')
  createCustomerProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCustomerProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createCustomerProfile(id, createCustomerProfileDto);
  }

  @UseGuards(CustomerGuard, UserGuard, StaffGuard)
  @Get('customers/:id/profiles')
  getCustomerProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.getCustomerProfile(id.toString());
  }

  @UseGuards(StaffGuard)
  @Post('staffs/:id/profiles')
  createStaffProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createStaffProfileDto: CreateProfileDto,
  ) {
    return this.profileService.createStaffProfile(id, createStaffProfileDto);
  }

  @UseGuards(UserGuard, StaffGuard)
  @Get('staffs/:id/profiles')
  getStaffProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.getStaffProfile(id.toString());
  }
}