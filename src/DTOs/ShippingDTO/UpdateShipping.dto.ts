import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateShippingDto{
        @ApiProperty()
        @IsOptional()
        @IsString()
        name?: string;
    
        @ApiProperty()
        @IsOptional()
        @IsBoolean()
        isActive?: boolean;
    
        @ApiProperty()
        @IsOptional()
        @IsNumber()
        iconPath?: string;
}