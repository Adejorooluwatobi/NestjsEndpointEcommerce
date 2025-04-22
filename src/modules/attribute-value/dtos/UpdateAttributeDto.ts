import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateAttributeValueDto{

    @ApiProperty()
        @IsString()
        attributeId: string;
    
    @ApiProperty()
        @IsString()
        attributeValue: string;
    
        @ApiProperty()
        @IsString()
        color: string;
}