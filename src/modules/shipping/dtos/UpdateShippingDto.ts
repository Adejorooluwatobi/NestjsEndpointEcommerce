import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateShippingDto{
        @ApiProperty()
        @IsString()
        name: string;
    
        @ApiProperty()
        @IsBoolean()
        isActive: boolean;
    
        @ApiProperty()
        @IsNumber()
        iconPath: string;
}