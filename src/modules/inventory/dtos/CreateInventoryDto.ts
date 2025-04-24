import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsNumber,IsString } from "class-validator";

export class CreateInventoryDto{

    

@ApiProperty()
@IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty()
@IsNotEmpty()
    @IsNumber()
    stockLevel: number;

}