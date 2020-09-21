import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: false })
    fullName!: string;

    @Column('varchar', { nullable: true })
    nickName!: string;

    @Column('date', { nullable: false })
    birthDate!: string;

    @Column('varchar', { nullable: false })
    birthPlace!: string;

    @Column('varchar', { nullable: false })
    id_card!: number;

    @Column('integer', { nullable: false })
    gender!: number;

    @Column('varchar', { nullable: false })
    identity_type!: string;

    @Column('integer', { nullable: false })
    religion!: number;

    @Column('integer', { nullable: false })
    marital_status!: number;

    @Column('integer', { nullable: false })
    job!: number;

    @Column('integer', { nullable: false })
    last_education!: number;

    @Column('varchar', { nullable: false })
    blood_type!: string;

    @Column('integer', { nullable: false })
    country_id!: number;

    @Column('integer', { nullable: false })
    province_id!: number;

    @Column('integer', { nullable: false })
    city_id!: number;

    @Column('integer', { nullable: false })
    district_id!: number;

    @Column('integer', { nullable: false })
    sub_district!: number;

    @Column('text', { nullable: false })
    address!: string;

    @Column('varchar', { nullable: false })
    domicile!: string;

    @Column('varchar', { nullable: false })
    lat!: string;

    @Column('varchar', { nullable: false })
    lon!: string;

    @Column('varchar', { nullable: false })
    email!: string;

    @Column('integer', { nullable: false })
    organization_id!: number;

    @Column('varchar', { nullable: false })
    ktp!: string;

    @Column('varchar', { nullable: false })
    profile!: string;

}
