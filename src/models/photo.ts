import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./product";

@Entity()
export default class Photo extends BaseEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id!:  string

    @Column()
    photo_path!: string
    
    // @Column()
    // main_photo!: boolean
    
    //forma de mapear o campo
    // @Column()
    // productId!: number


    @ManyToOne(() => Product, (product) => product.photo) // Define a relação muitos-para-um com a entidade Category
    product!: Product;    
}