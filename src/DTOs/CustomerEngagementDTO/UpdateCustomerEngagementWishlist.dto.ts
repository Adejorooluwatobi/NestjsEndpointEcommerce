import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class UpdateCustomerEngagementWishlistDto{

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    customerId?: string;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    productId?: string;
}