import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateAuditLogDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  staffId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  action?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  details?: string;
}