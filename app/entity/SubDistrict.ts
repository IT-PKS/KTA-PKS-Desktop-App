import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SubDistrict {
    constructor(partial?: Partial<SubDistrict>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer', { nullable: false })
    id_district!: number;

    @Column('integer', { nullable: false })
    bps_code!: number;

    @Column('integer', { nullable: false })
    level5_code!: number;

    @Column('integer', { nullable: false })
    level5_name!: string;

    @Column('datetime', { nullable: false })
    @CreateDateColumn()
    created_at!: Date;

    @Column('datetime', { nullable: false })
    @UpdateDateColumn()
    updated_at!: Date;

}
