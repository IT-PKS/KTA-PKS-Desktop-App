import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Education {
    constructor(partial?: Partial<Education>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: false })
    education!: string;

    @Column('datetime', { nullable: false })
    @CreateDateColumn()
    created_at!: Date;

    @Column('datetime', { nullable: false })
    @UpdateDateColumn()
    updated_at!: Date;

}
