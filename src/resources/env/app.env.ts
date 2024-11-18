import { config } from 'dotenv';
import { join } from 'path';
import { cwd } from 'process';

const currentWorkingDir = cwd();

config({
  path: 'env/.env',
  override: true,
});

export const AppEnvValues = {
  DATABASE_DIR: join(currentWorkingDir, 'database'),
  REDIS_URL: 'redis://127.0.0.1:6379',

  //env
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  // token
  ACCESS_TOKEN_EXP_SECOND: 60 * 60,
  REFRESH_TOKEN_EXP_SECOND: 86_400 * 7,
};
