import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  status_name: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  privacy: string;

  @IsNotEmpty()
  @IsUUID()
  created_by: string;

  @IsNotEmpty()
  @IsUUID()
  updated_by: string;
}