import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class InitMockSeeder1735413723095 implements MigrationInterface {
  name = 'InitMockSeeder1735413723094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const gamesMockPath = path.join(__dirname, '../mock/games.json');
    const games = JSON.parse(fs.readFileSync(gamesMockPath, 'utf-8'));

    for (const game of games) {
      await queryRunner.query(
        `INSERT INTO \`games\` (\`id\`, \`winner\`, \`finished_at\`) VALUES (?, ?, ?)`,
        [game.id, game.winner, game.finished_at],
      );
    }

    const playerMockPath = path.join(__dirname, '../mock/players.json');
    const players = JSON.parse(fs.readFileSync(playerMockPath, 'utf-8'));

    for (const player of players) {
      await queryRunner.query(
        `INSERT INTO \`players\` (\`id\`, \`nickname\`, \`full_name\`, \`avatar_url\`) VALUES (?, ?, ?, ?)`,
        [player.id, player.nickname, player.fullName, player.avatarUrl],
      );
    }

    const participantsMockPath = path.join(
      __dirname,
      '../mock/participants.json',
    );
    const participants = JSON.parse(
      fs.readFileSync(participantsMockPath, 'utf-8'),
    );

    for (const participant of participants) {
      await queryRunner.query(
        `INSERT INTO \`participants\` (\`id\`, \`game_id\`, \`player_id\`) VALUES (?, ?, ?)`,
        [participant.id, participant.gameId, participant.playerId],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
