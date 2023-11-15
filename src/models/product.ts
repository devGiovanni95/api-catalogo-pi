import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Category from "./category";
import { timeStamp } from "console";
// import Photos from "./photo";
import User from "./user";

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

    @Column()
    photo1?: string  

    @Column()
    photo2?: string 

    @Column()
    photo3?: string    
    
    @Column()
    photo4?: string    

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

    // @ManyToOne(() => User, (user) => user.products) // Define a relação muitos-para-um com a entidade Category
    // user!: User;

    // @OneToMany(() => Photos, (photo) => photo.product) // Define a relação um-para-muitos com a entidade Photos
    // photo?: Photos[]; // Esta propriedade conterá a lista de fotos relacionados a esta categoria

}