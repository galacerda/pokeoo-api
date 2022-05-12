import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLogEntity1652393687721 implements MigrationInterface {
  name = 'CreateLogEntity1652393687721';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`log\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`pokemonId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`log\` ADD CONSTRAINT \`FK_68396c13e4ec60f17b0c3cef101\` FOREIGN KEY (\`pokemonId\`) REFERENCES \`pokemon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`log\` DROP FOREIGN KEY \`FK_68396c13e4ec60f17b0c3cef101\``,
    );
    await queryRunner.query(`DROP TABLE \`log\``);
  }
}
