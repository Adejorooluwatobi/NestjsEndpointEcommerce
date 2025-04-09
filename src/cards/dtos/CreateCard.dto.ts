// src/cards/dtos/CreateCard.dto.ts
import { IsNotEmpty, IsUUID, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCardItemDto } from '../../card-items/dtos/CreateCardItems.dto';

export class CreateCardDto {
  @IsNotEmpty()
  @IsUUID()
  customer_id: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCardItemDto)
  cardItems?: CreateCardItemDto[];
}
