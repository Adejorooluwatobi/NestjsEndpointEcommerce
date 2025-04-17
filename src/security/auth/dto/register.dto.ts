import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
    email: string;
    
    @IsString()
      @ApiProperty()
    @IsNotEmpty()
    password: string;
  }

export class CustomerRegisterDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
    email: string;

    @IsString()
      @ApiProperty()
    @IsNotEmpty()
    password: string;
  }

export class StaffRegisterDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
    email: string;

    @IsString()
      @ApiProperty()
    @IsNotEmpty()
    password: string;
  }