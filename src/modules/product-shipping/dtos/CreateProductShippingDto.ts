import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty,IsNumber,IsString } from "class-validator";

export class CreateProductShippingDto{

    

@ApiProperty()
@IsNotEmpty()
    @IsString()
    productId: string;

    @ApiProperty()
@IsNotEmpty()
    @IsString()
    shippingId: string;

    @ApiProperty()
@IsNotEmpty()
    @IsNumber()
    shipCharge: number;

    @ApiProperty()
@IsNotEmpty()
    @IsBoolean()
    free: boolean;

    @ApiProperty()
@IsNotEmpty()
    @IsNumber()
    estimatedDays: number;
    
}