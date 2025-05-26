import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  
  @IsString()
  firstName: string;

  @ApiProperty()
  
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty()
  
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  
  @IsString()
  password: string;
}