import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
    @ApiProperty({
        description: 'Customer email address',
        example: 'customer@example.com'
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({
        description: 'Verification PIN code',
        example: '123456',
        minLength: 6,
        maxLength: 6
    })
    @IsString({ message: 'PIN must be a string' })
    @Length(6, 6, { message: 'PIN must be exactly 6 characters long' })
    @IsNotEmpty({ message: 'PIN is required' })
    pin: string;
}
