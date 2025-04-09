import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { StaffRole } from './staffRoles.entity';

@ObjectType()
@Entity({ name: 'staff_accounts' })
export class StaffAccount {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    first_name: string;

    @Field()
    @Column({ length: 100 })
    last_name: string;

    @Field()
    @Column({ length: 100 })
    phone_number: string;

    @Field()
    @Column({ length: 255 })
    email: string;

    @Field()
    @Column('text')
    password_hash: string;

    @Field()
    @Column('boolean')
    active: boolean;

    @Field()
    @Column('text')
    profile_img: string;

    @Field()
    @CreateDateColumn()
    registered_at: Date;

    @Field()
    @UpdateDateColumn()
    updated_at: Date;

    @Field()
    @Column('uuid')
    created_by: string;

    @Field()
    @Column('uuid')
    updated_by: string;

    @Field(() => StaffRole)
    @ManyToOne(() => StaffRole, (staffRole) => staffRole.staffAccounts)
    staffRole: StaffRole;
}
