import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateAttributeValueDto{

    @ApiProperty()
    @IsOptional()
        @IsString()
        attributeId?: string;
    
    @ApiProperty()
    @IsOptional()
        @IsString()
        attributeValue?: string;
    
        @ApiProperty()
        @IsOptional()
        @IsString()
        color?: string;
}