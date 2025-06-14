import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty,IsNumber,IsOptional,IsString } from "class-validator";

export class CreatePaymentDto{

@ApiProperty()
@IsNotEmpty()
@IsString()
orderId: string;

// @ApiProperty()
// @IsNotEmpty()
// @IsString()
customerId: string;

@ApiProperty()
@IsNotEmpty()
@IsString()
paymentMethod: string;

@ApiProperty()
@IsOptional()
@IsString()
transactionId: string;

@ApiProperty()
@IsNotEmpty()
@IsNumber()
amount: number;

@ApiProperty({default: 'pending'})
@IsOptional()
@IsString()
status: 'pending' | 'completed' | 'failed';
}