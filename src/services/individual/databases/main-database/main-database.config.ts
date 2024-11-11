import { join } from 'path';
import { AppEnvValues } from 'src/resources/env/app.env';
import { DataSourceOptions } from 'typeorm';

export const mainDatabaseConfig: DataSourceOptions = {
  type: 'sqlite',
  database: join(AppEnvValues.DATABASE_DIR, 'database.sqlite'),

  synchronize: true,

  entities: ['./dist/apps/main/**/*.entity.js'],

  enableWAL: true,
};
