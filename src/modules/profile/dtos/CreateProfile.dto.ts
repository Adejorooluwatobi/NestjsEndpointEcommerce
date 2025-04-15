import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {

  @IsNotEmpty()
  @IsString()
  altPhoneNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: Date;
}