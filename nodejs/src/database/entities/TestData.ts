import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'test_data'})
export class TestData {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column('decimal')
    data: Number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}