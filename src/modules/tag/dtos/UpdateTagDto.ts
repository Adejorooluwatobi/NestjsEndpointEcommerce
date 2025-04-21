import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateTagDto{

        @ApiProperty()
        @IsString()
        tagName: string;
    
        @ApiProperty()
        @IsString()
        icon: string;

}