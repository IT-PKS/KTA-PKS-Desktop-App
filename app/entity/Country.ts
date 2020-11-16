import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Country {
    constructor(partial?: Partial<Country>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer', { nullable: false })
    bps_code!: number;

    @Column('integer', { nullable: false })
    level1_code!: number;

    @Column('integer', { nullable: false })
    level1_name!: string;

    @Column('datetime', { nullable: false })
    @CreateDateColumn()
    created_at!: Date;

    @Column('datetime', { nullable: false })
    @UpdateDateColumn()
    updated_at!: Date;

}
