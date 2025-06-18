// src/cards/dtos/CreateCard.dto.ts
import { IsNotEmpty, IsUUID, IsOptional, IsArray, ValidateNested, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCardItemDto } from '../CardItemDTO/CreateCardItems.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
//   @ApiProperty()
// @IsNotEmpty()
//   @IsUUID()
  customerId: string;

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

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCardItemDto)
  cardItems?: CreateCardItemDto[];
}
