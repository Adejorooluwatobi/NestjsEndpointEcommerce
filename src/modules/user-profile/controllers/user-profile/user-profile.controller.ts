import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';

@Controller('users/:id/profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  createUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userProfileService.createUserProfile(id, createUserProfileDto);
  }

  @Get()
  getUserProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.userProfileService.getUserProfile(id.toString());
  }
}