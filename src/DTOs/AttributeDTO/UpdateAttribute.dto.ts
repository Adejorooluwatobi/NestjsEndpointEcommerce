import { ApiProperty } from "@nestjs/swagger";
import {IsOptional, IsString } from "class-validator";

export class UpdateAttributeDto{

    @ApiProperty()
    @IsOptional()
        @IsString()
        attributeName?: string;
}