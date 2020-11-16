import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class IdentityType {
    constructor(partial?: Partial<IdentityType>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: false })
    identity!: string;

    @Column('datetime', { nullable: false })
    @CreateDateColumn()
    created_at!: Date;

    @Column('datetime', { nullable: false })
    @UpdateDateColumn()
    updated_at!: Date;

}
