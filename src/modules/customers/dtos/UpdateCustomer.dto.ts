import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateCustomerDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

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
}