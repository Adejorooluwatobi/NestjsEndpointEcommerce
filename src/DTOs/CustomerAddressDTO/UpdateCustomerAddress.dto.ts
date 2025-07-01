import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCustomerAddressDto {

  // @ApiProperty()
  // @IsString()
  // customerId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address_line1?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address_line2?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}