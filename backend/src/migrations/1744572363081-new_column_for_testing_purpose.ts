import { MigrationInterface, QueryRunner } from "typeorm";

export class NewColumnForTestingPurpose1744572363081 implements MigrationInterface {
    name = 'NewColumnForTestingPurpose1744572363081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "test" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "test"`);
    }

}
