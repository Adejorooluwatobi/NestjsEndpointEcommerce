import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../auth/dto/login.dto'; // Assuming you have a LoginDto defined
import { RegisterDto } from '../auth/dto/register.dto'; // Assuming you have a RegisterDto defined
import { AccessTokenDto } from '../auth/dto/access-token.dto'; // Assuming you have an AccessTokenDto defined


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
  async userLogin(@Body() loginDto: LoginDto): Promise<AccessTokenDto> {
    const token = await this.authService.loginUser(loginDto.email, loginDto.password);
    return { accessToken: token.access_token, role: 'user' };
  }
}