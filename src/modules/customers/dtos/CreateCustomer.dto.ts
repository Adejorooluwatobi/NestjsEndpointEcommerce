import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()

@ApiProperty()
@IsNotEmpty()
    firstName: string;

    @IsString()
    @ApiProperty()
@IsNotEmpty()
    lastName: string;

    @IsString()
    @ApiProperty()
@IsNotEmpty()
    userName: string;

    @IsString()
    @ApiProperty()
@IsNotEmpty()
    phoneNumber: string;

    @IsEmail()
    @ApiProperty()
@IsNotEmpty()
    email: string;

    @IsString()
    @ApiProperty()
@IsNotEmpty()
    password: string;

    @IsBoolean()
    @ApiProperty()
@IsNotEmpty()
    isActive: boolean;
}