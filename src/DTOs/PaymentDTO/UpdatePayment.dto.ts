import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class UpdatePaymentDto{

@ApiProperty()
@IsString()
orderId: string;

@ApiProperty()
@IsString()
customerId: string;

@ApiProperty()
@IsString()
paymentMethod: string;

@ApiProperty()
@IsString()
transactionId: string;

@ApiProperty()
@IsNumber()
amount: number;

@ApiProperty()
@IsString()
status: 'pending' | 'completed' | 'failed';

@ApiProperty()
@IsDate()
createdAt: Date;

@ApiProperty()
@IsDate()
refundedAt: Date;
}