import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateInventoryDto{

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsNumber()
    stockLevel: number;

}