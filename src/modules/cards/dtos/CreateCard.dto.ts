// src/cards/dtos/CreateCard.dto.ts
import { IsNotEmpty, IsUUID, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCardItemDto } from '../../card-items/dtos/CreateCardItems.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
@IsNotEmpty()
  @IsUUID()
  customerId: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCardItemDto)
  cardItems?: CreateCardItemDto[];
}
