import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAttributeDto{

    

@ApiProperty()
@IsNotEmpty()
    @IsString()
    attributeName: string;
}