import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatusDto } from './CreateOrderItems.dto';

export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {
      status_name: string;
    
      color: string;

      privacy: string;
    
      created_by: string;

      updated_by: string;
}