import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class TestDataMigration1697724093405 implements MigrationInterface {

    private table = new Table({
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

      public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.table);
      }
      public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.table);
      }

}
