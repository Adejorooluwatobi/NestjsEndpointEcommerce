import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailVerificationService } from 'src/Services/EmailVerification/emailVerification.service';

@Resolver('EmailVerification')
export class EmailVerificationResolver {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Mutation(() => Boolean)
  async verifyEmail(@Args('token') token: string): Promise<boolean> {
    return this.emailVerificationService.verifyEmail(token);
  }

  @Mutation(() => Boolean)
  async sendVerificationEmail(@Args('email') email: string): Promise<boolean> {
    return this.emailVerificationService.sendVerificationEmail(email);
  }
}