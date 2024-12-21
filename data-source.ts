import { DataSource } from 'typeorm';

// npm run migration MigrationName

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '770770',
  database: 'mafia_game',
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/src/migrations/*.ts`],
  synchronize: false,
});

export default AppDataSource;
