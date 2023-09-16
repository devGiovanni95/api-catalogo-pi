import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Category from "./category";
import { timeStamp } from "console";

@Entity()
export default class Product extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id!:  number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    price!: number
    
    @Column()
    color!: string    

    @Column({default: false})
    promotion!: boolean

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at?: Date;

    @CreateDateColumn()
    expiration_date!: Date;

    @ManyToOne(() => Category, (category) => category.products) // Define a relação muitos-para-um com a entidade Category
    category!: Category;
    
}