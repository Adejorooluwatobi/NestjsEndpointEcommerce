import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, Req } from '@nestjs/common';
import { CreateProfileDto } from '../../DTOs/ProfileDTO/CreateProfile.dto';
import { ProfileService } from '../../Services/profile/profile.service';
import { CustomerGuard, StaffGuard, UniversalGuard, UserGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, ProfileResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(CreateProfileDto)
@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(UserGuard)
  @Post('users/profiles')
  @ApiOperation({ summary: 'Create user profile by ID' })
      @ApiOkResponse({
          description: 'User profile created successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(ProfileResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({ description: 'User not found', type: ErrorResponseDto })
      @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
  async createUserProfile(
    //@Param('id', ParseUUIDPipe) id: string,
    @Body() createProfileDto: CreateProfileDto, @Req() req
  ) {
    const userId = req.user.sub;
    const profile = await this.profileService.createUserProfile(userId, createProfileDto);
    return {
      succeeded: true,
      message: 'User profile created successfully',
      statusCode: 201,
      resultData: profile,
    };
  }

  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all user profiles' })
      @ApiOkResponse({
          description: 'User profiles retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(ProfileResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({ description: 'No user profiles found', type: ErrorResponseDto })
  @Get('users/:id/profiles')
  async getUserProfile(@Param('id', ParseUUIDPipe) id: string) {
    const profile = await this.profileService.getUserProfile(id);
    return {
      succeeded: true,
      message: 'User profile retrieved successfully',
      statusCode: 200,
      resultData: profile,
    };
  }

  @UseGuards(CustomerGuard)
  @Post('customers/profiles')
  @ApiOperation({ summary: 'Create customer profile by ID' })
      @ApiOkResponse({
          description: 'Customer profile created successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(ProfileResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({ description: 'Customer not found', type: ErrorResponseDto })
      @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
  async createCustomerProfile(
    //@Param('id', ParseUUIDPipe) id: string,
    @Body() createCustomerProfileDto: CreateProfileDto, @Req() req
  ) {
    const customerId = req.customer.sub;
    const profile = await this.profileService.createCustomerProfile(customerId, createCustomerProfileDto);
    return {
      succeeded: true,
      message: 'Customer profile created successfully',
      statusCode: 201,
      resultData: profile,
    };
  }

  @UseGuards(UniversalGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all customer profiles' })
      @ApiOkResponse({
          description: 'customer profiles retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(ProfileResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({ description: 'No customer profiles found', type: ErrorResponseDto })
  @Get('customers/:id/profiles')
  async getCustomerProfile(@Param('id', ParseUUIDPipe) id: string) {
    const profile = await this.profileService.getCustomerProfile(id);
    return {
      succeeded: true,
      message: 'Customer profile retrieved successfully',
      statusCode: 200,
      resultData: profile,
    };
  }

  @UseGuards(StaffGuard)
  @Post('staffs/profiles')
  @ApiOperation({ summary: 'Create staff profile by ID' })
      @ApiOkResponse({
          description: 'staff profile created successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(ProfileResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({ description: 'Staff not found', type: ErrorResponseDto })
      @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
  async createStaffProfile(
    //@Param('id', ParseUUIDPipe) id: string,
    @Body() createStaffProfileDto: CreateProfileDto, @Req() req
  ) {
    const staffId = req.customer.sub;
    const profile = await this.profileService.createStaffProfile(staffId, createStaffProfileDto);
    return {
      succeeded: true,
      message: 'Staff profile created successfully',
      statusCode: 201,
      resultData: profile,
    };
  }

  @UseGuards(StaffGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all staff profiles' })
      @ApiOkResponse({
          description: 'staff profiles retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(ProfileResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({ description: 'No staff profiles found', type: ErrorResponseDto })
  @Get('staffs/:id/profiles')
  async getStaffProfile(@Param('id', ParseUUIDPipe) id: string) {
    const profile = await this.profileService.getStaffProfile(id);
    return {
      succeeded: true,
      message: 'Staff profile retrieved successfully',
      statusCode: 200,
      resultData: profile,
    };
  }

  @Get('profiles')
  @ApiOperation({ summary: 'Get all profile' })
      @ApiOkResponse({
          description: 'Profile retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(ProfileResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
  async findAllProfiles() {
    const profile = await this.profileService.findAllProfiles();
    return {
      succeeded: true,
      message: 'Profiles retrieved successfully',
      statusCode: 200,
      resultData: profile,
    };
  }
}