import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./order";
import Product from "./product";

@Entity()
export default class OrderItem extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Order, (order) => order.orderItems) // Relacionamento muitos-para-um com Order
    order!: Order;

    @ManyToOne(() => Product, (product) => product.orderItems) // Relacionamento muitos-para-um com Product
    product!: Product;

    @Column()
    quantity!: number; // Quantidade do produto no pedido

    @Column()
    price!: number; // Preço do produto no momento do pedido (pode ser diferente do preço atual)
}
