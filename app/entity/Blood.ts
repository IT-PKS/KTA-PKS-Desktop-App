import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp } from "typeorm";

@Entity()
export class Blood {
    constructor(partial?: Partial<Blood>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: false })
    blood!: string;

    @Column('datetime', { nullable: false })
    @CreateDateColumn()
    created_at!: Date;

    @Column('datetime', { nullable: false })
    @UpdateDateColumn()
    updated_at!: Date;

}
