import { Query, Resolver } from '@nestjs/graphql';
import { Payment } from 'src/database/entities/payment.entity';
import { PaymentService } from '../../Services/payment/payment.service';



@Resolver(() => Payment)
export class PaymentResolver {
    constructor(private paymentService: PaymentService) {}

    @Query(() => [Payment], {name: 'product'})
    async findPayment(): Promise<Payment[]> {
        return this.paymentService.findPayment();
    }
}
