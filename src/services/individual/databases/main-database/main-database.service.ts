import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { mainDatabaseConfig } from './main-database.config';

@Injectable()
export class MainDatabaseService {
  private dataSource = new DataSource(mainDatabaseConfig);

  getDataSource() {
    return this.dataSource;
  }
}
