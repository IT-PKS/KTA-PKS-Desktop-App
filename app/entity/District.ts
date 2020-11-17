import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class District {
    constructor(partial?: Partial<District>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('integer', { nullable: false })
    id_city!: number;

    @Column('integer', { nullable: false })
    bps_code!: number;

    @Column('integer', { nullable: false })
    level4_code!: number;

    @Column('integer', { nullable: false })
    level4_name!: string;

    @Column('datetime', { nullable: false })
    @CreateDateColumn()
    created_at!: Date;

    @Column('datetime', { nullable: false })
    @UpdateDateColumn()
    updated_at!: Date;

}
