import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCouponDto{

    

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    couponDescription: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    discountValue: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    discountType: string;

    @ApiProperty()
    @IsBoolean()
    timesUsed: boolean;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    maxUsage: number;;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    couponStartDate: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    couponEndDate: Date;
}