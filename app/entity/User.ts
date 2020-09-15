import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: true })
    firstName!: string;

    @Column('varchar', { nullable: true })
    lastName!: string;

    @Column('int', { nullable: true })
    age!: number;

}