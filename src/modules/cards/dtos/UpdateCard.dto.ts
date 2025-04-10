import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './CreateCard.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {}