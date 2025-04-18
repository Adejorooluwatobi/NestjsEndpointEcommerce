import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt, IsNumber, IsString } from "class-validator";

export class UpdateCouponDto{

    @ApiProperty()
    @IsString()
    code: string;

    @ApiProperty()
    @IsString()
    couponDescription: string;

    @ApiProperty()
    @IsNumber()
    discountValue: number;

    @ApiProperty()
    @IsString()
    discountType: string;

    @ApiProperty()
    @IsBoolean()
    timesUsed: boolean;

    @ApiProperty()
    @IsInt()
    maxUsage: number;;

    @ApiProperty()
    @IsDate()
    couponStartDate: Date;

    @ApiProperty()
    @IsDate()
    couponEndDate: Date;

}