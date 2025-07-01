import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAnalyticDto{
@ApiProperty()
@IsOptional()
@IsString()
metric?: string;
    
@ApiProperty()
@IsOptional()
@IsNumber()
value?: number;

@ApiProperty()
@IsOptional()
metadata?: Record<string, any>;
}
