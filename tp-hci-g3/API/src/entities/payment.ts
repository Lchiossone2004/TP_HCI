import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "./user";
import { IsEnum } from "class-validator";
import { Card } from "./card";
import { PaymentMetadata, ServicePaymentMetadata } from '../types/payment';


@Entity()
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    //@IsEnum(PaymentType)
    method: string;

    @Column()
    description: string;

    @Column()
    amount: number;

    @Column({ nullable: true })
    payerBalanceBefore: number;

    @Column({ nullable: true })
    payerBalanceAfter: number;

    @Column({ nullable: true })
    receiverBalanceBefore: number;

    @Column({ nullable: true })
    receiverBalanceAfter: number;

    @Column({ default: false })
    pending: boolean;

    @Column({ nullable: true })
    uuid: string;

    @Column({ type: "simple-json", nullable: true })
    metadata?: PaymentMetadata;

    // Helper method to validate service metadata
    hasValidServiceMetadata(): boolean {
        if (!this.metadata) return false;
        const metadata = this.metadata as ServicePaymentMetadata;
        return (
            metadata.type === 'service' &&
            typeof metadata.code === 'string' &&
            typeof metadata.link === 'string' &&
            typeof metadata.createdAt === 'string'
        );
    }
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Card, card => card.payments, { onDelete: 'CASCADE' })
    card: Card;

    @ManyToOne(() => User, user => user.paymentsPaid, { onDelete: 'CASCADE' })
    payer: User;

    @ManyToOne(() => User, user => user.paymentsReceived, { onDelete: 'CASCADE' })
    receiver: User;
}