import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";


@InputType()
export class UpdateCardItemDto {

  @ApiProperty()

  @Field()
  productId: string;
  
  @ApiProperty()

  @Field()
  cardId: string;

  @ApiProperty()

  @Field()
  itemDetails: string;
  }