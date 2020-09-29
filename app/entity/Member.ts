import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Member {
    constructor(partial?: Partial<Member>) {
        if (partial) Object.assign(this, partial)
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { nullable: false })
    fullname!: string;

    @Column('varchar', { nullable: true })
    nickname!: string;

    @Column('date', { nullable: false })
    birthdate!: string;

    @Column('varchar', { nullable: false })
    birthplace!: string;

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

    @Column('text', { nullable: true })
    address!: string;

    @Column('varchar', { nullable: false })
    domicile!: string;

    @Column('varchar', { nullable: true })
    lat!: string;

    @Column('varchar', { nullable: true })
    lon!: string;

    @Column('varchar', { nullable: true })
    email!: string;

    @Column('integer', { nullable: false })
    organization_id!: number;

    @Column('varchar', { nullable: false })
    ktp!: string;

    @Column('varchar', { nullable: false })
    profile!: string;

    @Column('varchar', { nullable: true })
    isSentToBackend!: boolean;

}
