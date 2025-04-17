import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerLoginDto, LoginDto, StaffLoginDto, } from '../auth/dto/login.dto'; // Assuming you have a LoginDto defined
import { CustomerRegisterDto, RegisterDto, StaffRegisterDto } from '../auth/dto/register.dto'; // Assuming you have a RegisterDto defined
import { CustomerAccessTokenDto, StaffAccessTokenDto, UserAccessTokenDto } from '../auth/dto/access-token.dto'; // Assuming you have an AccessTokenDto defined


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  async registerUser(@Body() registerDto: RegisterDto): Promise<string> {
    const hashedPassword = await this.authService.hashPassword(registerDto.password);
    await this.authService.registerUser(registerDto.email, hashedPassword); // Save user to the database
    return 'User registered successfully';
  }


  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() loginDto: LoginDto): Promise<UserAccessTokenDto> {
    const token = await this.authService.loginUser(loginDto.email, loginDto.password);
    return { accessToken: token.access_token, isAdmin: token.user.isAdmin, isActive: token.user.isActive };
  }

  @Post('customer/register')
  async registerCustomer(@Body() registerDto: CustomerRegisterDto): Promise<string> {
    const hashedPassword = await this.authService.hashPassword(registerDto.password);
    await this.authService.registerCustomer(registerDto.email, hashedPassword); // Save user to the database
    return 'customer registered successfully';
  }


  @Post('customer/login')
  @HttpCode(HttpStatus.OK)
  async customerLogin(@Body() loginDto: CustomerLoginDto): Promise<CustomerAccessTokenDto> {
    const token = await this.authService.loginCustomer(loginDto.email, loginDto.password);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { accessToken: token.access_token, isActive: token.customer.isActive }
  }

  @Post('staff/register')
  async registerStaff(@Body() registerDto: StaffRegisterDto): Promise<string> {
    const hashedPassword = await this.authService.hashPassword(registerDto.password);
    await this.authService.registerStaff(registerDto.email, hashedPassword); // Save user to the database
    return 'staff registered successfully';
  }


  @Post('staff/login')
  @HttpCode(HttpStatus.OK)
  async staffLogin(@Body() loginDto: StaffLoginDto): Promise<StaffAccessTokenDto> {
    const token = await this.authService.loginStaff(loginDto.email, loginDto.password);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { accessToken: token.access_token, isActive: token.staff.isActive }
  }
}