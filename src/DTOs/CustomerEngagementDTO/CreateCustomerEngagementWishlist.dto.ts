import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateCustomerEngagementWishlistDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    customerId: string;

    @ApiProperty()
    @IsUUID()
    productId: string;
}