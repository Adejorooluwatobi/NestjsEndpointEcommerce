import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateProductCouponDto{

    @ApiProperty()

    @IsString()
    productId: string;

    @ApiProperty()

    @IsString()
    attributeId: string;

}