import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsString } from "class-validator";

export class UpdateAnalyticDto{
@ApiProperty()
@IsString()
metric: string;
    
@ApiProperty()
@IsNumber()
value: number;

@ApiProperty()
metadata: Record<string, any>;
}
