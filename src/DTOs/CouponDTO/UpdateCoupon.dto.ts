import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCouponDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    code?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    couponDescription?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    discountValue?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    discountType?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    timesUsed?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    maxUsage?: number;;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    couponStartDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    couponEndDate?: Date;

}