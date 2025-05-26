import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCustomerEngagementReviewDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    comment: string;
}