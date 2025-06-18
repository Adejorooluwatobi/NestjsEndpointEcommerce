import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class UpdateCustomerEngagementWishlistDto{

    @ApiProperty()
    @IsUUID()
    customerId: string;

    @ApiProperty()
    @IsUUID()
    productId: string;
}