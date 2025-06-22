import { Controller, Post, Body, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResendVerificationDto } from 'src/DTOs/EmailVerificationDTO/ResendVerification.dto';
// import { ResendVerificationDto } from 'src/DTOs/EmailVerificationDTO/ResendVerification.dto';
import { VerifyEmailDto } from 'src/DTOs/EmailVerificationDTO/VerifyEmail.dto';
import { VerificationResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { CustomersService } from 'src/Services/customers/customers.service';

@ApiTags('Customer Email Verification')
@Controller('customer/verification')
export class CustomerVerificationController {
    constructor(private customersService: CustomersService) {}

    @Post('verify')
    @ApiOperation({ 
        summary: 'Verify customer email with PIN',
        description: 'Verifies customer email using the PIN sent to their email address and activates their account'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Email verified successfully and account activated',
        type: VerificationResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid or expired verification code, or account already verified',
    })
    @ApiNotFoundResponse({
        description: 'Customer not found',
    })
    async verifyEmail(
        @Body(new ValidationPipe()) verifyEmailDto: VerifyEmailDto
    ): Promise<VerificationResponseDto> {
        const customer = await this.customersService.verifyCustomerEmail(
            verifyEmailDto.email,
            verifyEmailDto.pin
        );

        return {
            succeeded: true,
            message: 'Email verified successfully. Your account is now active and you can log in.',
            statusCode: HttpStatus.OK,
            resultData: {
                customerId: customer.id,
                email: customer.email,
                isActive: customer.isActive,
                verifiedAt: new Date().toISOString(),
            },
        };
    }

    @Post('resend')
    @ApiOperation({ 
        summary: 'Resend verification PIN',
        description: 'Resends verification PIN to customer email with rate limiting (1 minute between requests, max 5 per hour)'
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Verification code resent successfully',
        type: VerificationResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Rate limit exceeded, account already verified, or invalid email',
    })
    @ApiNotFoundResponse({
        description: 'Customer not found',
    })
    async resendVerificationCode(
        @Body(new ValidationPipe()) resendDto: ResendVerificationDto
    ): Promise<VerificationResponseDto> {
        const { verificationCode, resentAt, expiresInMinutes } = await this.customersService.resendVerificationCode(resendDto.email);

        return {
            succeeded: true,
            message: `Verification code has been resent to ${resendDto.email}. Please check your inbox.`,
            statusCode: HttpStatus.OK,
            resultData: {
                email: resendDto.email,
                resentAt,
                expiresInMinutes,
                verificationCode, // <-- Now included!
            },
        };
    }
}