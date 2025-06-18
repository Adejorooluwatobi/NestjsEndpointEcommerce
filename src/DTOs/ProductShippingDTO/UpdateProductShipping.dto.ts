import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateProductShippingDto{

    @ApiProperty()
        @IsString()
        productId: string;
    
        @ApiProperty()
        @IsString()
        shippingId: string;
    
        @ApiProperty()
        @IsNumber()
        shipCharge: number;
    
        @ApiProperty()
        @IsBoolean()
        free: boolean;
    
        @ApiProperty()
        @IsNumber()
        estimatedDays: number;
        

}