import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty,IsNumber,IsString } from "class-validator";

export class CreatePaymentDto{

@ApiProperty()
@IsNotEmpty()
@IsString()
orderId: string;

@ApiProperty()
@IsNotEmpty()
@IsString()
customerId: string;

@ApiProperty()
@IsNotEmpty()
@IsString()
paymentMethod: string;

@ApiProperty()
@IsNotEmpty()
@IsString()
transactionId: string;

@ApiProperty()
@IsNotEmpty()
@IsNumber()
amount: number;

@ApiProperty()
@IsNotEmpty()
@IsString()
status: 'pending' | 'completed' | 'failed';

@ApiProperty()
@IsNotEmpty()
@IsDate()
createdAt: Date;

@ApiProperty()
@IsNotEmpty()
@IsDate()
refundedAt: Date;
}