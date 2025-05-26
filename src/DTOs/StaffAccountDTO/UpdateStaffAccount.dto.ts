import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class UpdateStaffAccountDto {
    @IsString()
    @ApiProperty()

    firstName: string;

    @IsString()
    @ApiProperty()

    lastName: string;

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

    @IsString()
    @ApiProperty()

    profileImg: string;

}