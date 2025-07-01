import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerAddressDto {

//   @ApiProperty()
// @IsNotEmpty()
//   @IsString()
  customerId: string;

  @ApiProperty()
@IsNotEmpty()
  @IsString()
  address_line1: string;

  @ApiProperty()
@IsOptional()
  @IsString()
  address_line2?: string;

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
  @IsNotEmpty() // Ensure this validation is present
  @IsString()
  phoneNumber: string;
}