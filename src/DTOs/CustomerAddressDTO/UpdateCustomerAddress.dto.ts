import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCustomerAddressDto {

  // @ApiProperty()
  // @IsString()
  // customerId: string;

  @ApiProperty()
  @IsString()
  address_line1: string;

  @ApiProperty()
  @IsString()
  address_line2: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;
}