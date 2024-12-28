import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1735413723094 implements MigrationInterface {
  name = 'InitTables1735413723094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`players\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`avatar_url\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_b087be71894b730ec150a1ed45\` (\`nickname\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`participants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`game_id\` int NOT NULL, \`player_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`winner\` enum ('Mafia', 'Civilians', 'Draw') NULL, \`finished_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`participants\` ADD CONSTRAINT \`FK_08671636ed32b84f904e1f69b3b\` FOREIGN KEY (\`game_id\`) REFERENCES \`games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`participants\` ADD CONSTRAINT \`FK_234316487cf6c21ecf5767c6a86\` FOREIGN KEY (\`player_id\`) REFERENCES \`players\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`participants\` DROP FOREIGN KEY \`FK_234316487cf6c21ecf5767c6a86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`participants\` DROP FOREIGN KEY \`FK_08671636ed32b84f904e1f69b3b\``,
    );
    await queryRunner.query(`DROP TABLE \`games\``);
    await queryRunner.query(`DROP TABLE \`participants\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b087be71894b730ec150a1ed45\` ON \`players\``,
    );
    await queryRunner.query(`DROP TABLE \`players\``);
  }
}
