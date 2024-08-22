import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./user";
import Product from "./product";
import OrderItem from "./orderItem";

@Entity()
export default class Order extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phone?: string;

    @Column()
    order_number!: string; // Número do pedido

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at?: Date;

    @ManyToOne(() => User, (user) => user.orders) // Relacionamento muitos-para-um com User
    user!: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order) // Relacionamento um-para-muitos com OrderItem
    orderItems!: OrderItem[];

    @Column({ default: 'pending' })
    status?: string; // Status do pedido, por exemplo: 'pending', 'completed', 'shipped'

    @Column("json", { nullable: true })
    deliveryDetails?: {
        address: string;
        district: string;
        city: string;
        state: string;
        country: string;
    };


}
