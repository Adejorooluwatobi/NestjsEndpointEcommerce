import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductShippingDto{

    @ApiProperty()
    @IsOptional()
        @IsString()
        productId?: string;
    
        @ApiProperty()
        @IsOptional()
        @IsString()
        shippingId?: string;
    
        @ApiProperty()
        @IsOptional()
        @IsNumber()
        shipCharge?: number;
    
        @ApiProperty()
        @IsOptional()
        @IsBoolean()
        free?: boolean;
    
        @ApiProperty()
        @IsOptional()
        @IsNumber()
        estimatedDays?: number;
        

}