"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataMigration1697724093405 = void 0;
const typeorm_1 = require("typeorm");
class TestDataMigration1697724093405 {
    constructor() {
        this.table = new typeorm_1.Table({
            name: 'test_data',
            columns: [
                {
                    name: 'id',
                    type: "varchar",
                    isPrimary: true,
                    generationStrategy: "uuid",
                },
                {
                    name: 'data',
                    type: 'decimal',
                    isUnique: false,
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamptz',
                    isNullable: false,
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamptz',
                    isNullable: false,
                    default: 'now()',
                },
            ],
        });
    }
    async up(queryRunner) {
        await queryRunner.createTable(this.table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(this.table);
    }
}
exports.TestDataMigration1697724093405 = TestDataMigration1697724093405;
