import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'user_posts'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    // Add this column to your entity for soft delete feature!
    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: 'CASCADE' 
    })
    user: User;
}