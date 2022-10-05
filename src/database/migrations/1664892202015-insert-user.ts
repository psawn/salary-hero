import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLeaveFindPeriod1664443625559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(email, code) VALUES ('admin@gmail.com', 'ADMIN001')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO
  }
}
