import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCustomerEngagementReviewDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    customerId: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    rating?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    comment?: string;

}