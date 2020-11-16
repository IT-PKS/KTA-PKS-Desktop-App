import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class City {
    constructor(partial?: Partial<City>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer', { nullable: false })
    id_province!: number;

    @Column('integer', { nullable: false })
    bps_code!: number;

    @Column('integer', { nullable: false })
    level3_code!: number;

    @Column('integer', { nullable: false })
    level3_name!: string;

    @Column('datetime', { nullable: false })
    @CreateDateColumn()
    created_at!: Date;

    @Column('datetime', { nullable: false })
    @UpdateDateColumn()
    updated_at!: Date;

}
