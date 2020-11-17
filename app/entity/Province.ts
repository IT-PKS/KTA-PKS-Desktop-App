import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Province {
    constructor(partial?: Partial<Province>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer', { nullable: false })
    id_country!: number;

    @Column('integer', { nullable: false })
    bps_code!: number;

    @Column('integer', { nullable: false })
    level2_code!: number;

    @Column('integer', { nullable: false })
    level2_name!: string;

    @Column('datetime', { nullable: false })
    @CreateDateColumn()
    created_at!: Date;

    @Column('datetime', { nullable: false })
    @UpdateDateColumn()
    updated_at!: Date;

}
