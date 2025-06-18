import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateCustomerEngagementReviewDto{

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsString()
    customerId: string;

    @ApiProperty()
    @IsNumber()
    rating: number;

    @ApiProperty()
    @IsString()
    comment: string;

}