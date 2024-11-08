import { DataSourceOptions } from 'typeorm';

export const postgresqlDatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: '10.0.233.121',
  port: 5432,
  username: 'postgres',
  password: 'Amo@phh123',
  database: 'dev-akm',

  // Corrected to use the path to JavaScript files in the dist folder
  entities: ['dist/apps/postgresql/**/*.entity.js'],

  synchronize: true,
};
