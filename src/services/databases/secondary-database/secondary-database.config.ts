import { join } from 'path';
import { AppEnvValues } from 'src/resources/env/app.env';
import { DataSourceOptions } from 'typeorm';

export const secondaryDatabaseConfig: DataSourceOptions = {
  type: 'sqlite',
  database: join(AppEnvValues.DATABASE_DIR, 'secondary-database.sqlite'),

  synchronize: true,

  entities: ['./dist/apps/secondary/**/*.entity.js'],

  enableWAL: true,
};