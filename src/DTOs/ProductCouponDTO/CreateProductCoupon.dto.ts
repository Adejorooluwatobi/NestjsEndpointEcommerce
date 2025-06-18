import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsString } from "class-validator";

export class CreateProductCouponDto{

    

@ApiProperty()
@IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    couponId: string;

}