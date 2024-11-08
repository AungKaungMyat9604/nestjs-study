import { Injectable } from '@nestjs/common';
import { postgresqlDatabaseConfig } from './postgresql-database.config';
import { DataSource } from 'typeorm';

@Injectable()
export class PostgresqlDatabaseService {
  private dataSource = new DataSource(postgresqlDatabaseConfig);

  getDataSource() {
    return this.dataSource;
  }
}
