import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletedColumn1744572111795 implements MigrationInterface {
    name = 'DeletedColumn1744572111795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "testingMyself"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "testingMyself" character varying`);
    }

}
