import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTagDto{

        @ApiProperty()
        @IsOptional()
        @IsString()
        tagName?: string;
    
        @ApiProperty()
        @IsOptional()
        @IsString()
        icon?: string;

}