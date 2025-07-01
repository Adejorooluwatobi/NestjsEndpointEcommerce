import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePaymentDto{

@ApiProperty()
@IsOptional()
@IsString()
orderId?: string;

// @ApiProperty()
// @IsString()
// customerId: string;

@ApiProperty()
@IsOptional()
@IsString()
paymentMethod?: string;

@ApiProperty()
@IsOptional()
@IsString()
transactionId?: string;

@ApiProperty()
@IsOptional()
@IsNumber()
amount?: number;

@ApiProperty()
@IsOptional()
@IsString()
status?: 'pending' | 'completed' | 'failed';

@ApiProperty()
@IsOptional()
@IsDate()
refundedAt?: Date;
}