import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Profile } from './Profile.entity';
import { StaffRole } from './staffRoles.entity';

@ObjectType()
@Entity({ name: 'staff_accounts' })
export class StaffAccount {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    firstName: string;

    @Field()
    @Column({ length: 100 })
    lastName: string;

    @Field()
    @Column({ length: 100 })
    phoneNumber: string;

    @Field()
    @Column({ length: 255 })
    email: string;

    @Field()
    @Column('text')
    password: string;

    @Field()
    @Column('boolean')
    isActive: boolean;;

    @Field()
    @Column('text')
    profileImg: string;

    @Field(() => Profile, { nullable: true })
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @Field()
    @CreateDateColumn()
    registeredAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column('uuid', { nullable: true }) // Track who created the coupon
    createdBy: string;

    @Field()
    @Column('uuid', { nullable: true }) // Track who last updated the coupon
    updatedBy: string;

    @Field(() => StaffRole)
    @ManyToOne(() => StaffRole, (staffRole) => staffRole.staffAccounts)
    staffRole: StaffRole;
}
