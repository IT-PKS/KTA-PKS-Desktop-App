import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Gender {
    constructor(partial?: Partial<Gender>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: true })
    gender!: string;

    @Column('varchar', { nullable: true })
    @CreateDateColumn()
    created_at!: string;

    @Column('varchar', { nullable: true })
    @UpdateDateColumn()
    updated_at!: string;

}
