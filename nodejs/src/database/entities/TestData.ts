import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'test_data'})
export class TestData {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column('decimal')
    data: Number
}