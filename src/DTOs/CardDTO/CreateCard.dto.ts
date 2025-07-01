// src/cards/dtos/CreateCard.dto.ts
import { IsNotEmpty, IsUUID, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
//   @ApiProperty()
// @IsNotEmpty()
//   @IsUUID()
  // customerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  cardNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cardName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cardType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
