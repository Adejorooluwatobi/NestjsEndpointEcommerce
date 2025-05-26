import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAttributeValueDto{

@ApiProperty()
@IsNotEmpty()
    @IsString()
    attributeId: string;

@ApiProperty()
@IsNotEmpty()
    @IsString()
    attributeValue: string;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    color: string;

}