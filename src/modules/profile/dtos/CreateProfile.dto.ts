import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  altPhoneNumber: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  dateOfBirth: Date;
}