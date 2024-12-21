import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1734782344193 implements MigrationInterface {
  name = 'CreateUserTable1734782344193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
