import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Post";
import { Address } from "./Address";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({ unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true})
    authStrategy: string;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    // Add this column to your entity for soft delete feature!
    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, (post) => post.user, {
        cascade: true
    })
    posts: Post[];

    @ManyToMany(() => Address, (address) => address.users, {
        cascade: true,
    })
    @JoinTable()
    addresses: Address[];
}