import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    constructor(partial?: Partial<User>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: true })
    firstName!: string;

    @Column('varchar', { nullable: true })
    lastName!: string;

    @Column('varchar', { nullable: true })
    email!: string;

    @Column('varchar', { nullable: true })
    password!: string;

    @Column('varchar', { nullable: true })
    serialKey!: string;

}
