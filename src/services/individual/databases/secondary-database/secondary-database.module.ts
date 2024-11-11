import { Module } from '@nestjs/common';
import { BackupDatabaseService as SecondaryDatabaseService } from './secondary-database.service';

@Module({
  providers: [SecondaryDatabaseService],
  exports: [SecondaryDatabaseService],
})
export class BackupDatabaseModule {}
