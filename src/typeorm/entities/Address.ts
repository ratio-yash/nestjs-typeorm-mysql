import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'addresses'})
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    state: string;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    // Add this column to your entity for soft delete feature!
    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToMany(() => User, (user) => user.addresses, {
        onDelete: 'CASCADE' 
    }) 
    users: User[]
}