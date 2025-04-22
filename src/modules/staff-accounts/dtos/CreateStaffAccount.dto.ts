import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStaffAccountDto {
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

    @IsString()
    @ApiProperty()
@IsNotEmpty()
    profileImg: string;

}