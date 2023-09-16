import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id!:  number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at?: Date;
    
}