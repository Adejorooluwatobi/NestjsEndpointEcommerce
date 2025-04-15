import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStaffAccountDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    profileImg: string;

}