import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateCustomerDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    firstName?: string;
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    lastName?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    userName?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    phoneNumber?: string;

    @IsEmail()
    @ApiProperty()
    @IsOptional()
    email?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    password: string;

    @IsBoolean()
    @ApiProperty()
    @IsOptional()
    isActive?: boolean;
}