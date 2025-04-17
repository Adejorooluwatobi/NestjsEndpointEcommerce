import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
@ApiProperty()
@IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
@IsNotEmpty()
  password: string;
}

export class CustomerLoginDto {
  @IsEmail()
  @ApiProperty()
@IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
@IsNotEmpty()
  password: string;
}

export class StaffLoginDto {
  @IsEmail()
  @ApiProperty()
@IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
@IsNotEmpty()
  password: string;
}