import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty,IsNumber,IsString } from "class-validator";

export class CreateShippingDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    iconPath: string;
    
}