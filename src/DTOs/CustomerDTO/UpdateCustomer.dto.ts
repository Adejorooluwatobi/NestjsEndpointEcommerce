import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class UpdateCustomerDto {
    @IsString()
    @ApiProperty()

    firstName: string;
    
    @IsString()
    @ApiProperty()

    lastName: string;

    @IsString()
    @ApiProperty()

    userName: string;

    @IsString()
    @ApiProperty()

    phoneNumber: string;

    @IsEmail()
    @ApiProperty()

    email: string;

    @IsString()
    @ApiProperty()

    password: string;

    @IsBoolean()
    @ApiProperty()

    isActive: boolean;
}