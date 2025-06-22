import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

@Entity({ name: 'email_verifications' })
export class EmailVerification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    @Index() // Add index for faster lookups
    email: string;

    @Column({ length: 6 })
    verificationCode: string;

    @Column({ type: 'timestamp' })
    expiresAt: Date;

    @Column({ default: false })
    isUsed: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: 0 })
    resendCount: number; // Track how many times code was resent

    @Column({ type: 'timestamp', nullable: true })
    lastResendAt: Date;
}