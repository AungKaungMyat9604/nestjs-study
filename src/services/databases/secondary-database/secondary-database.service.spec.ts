import { Test, TestingModule } from '@nestjs/testing';
import { BackupDatabaseService } from './secondary-database.service';

describe('BackupDatabaseService', () => {
  let service: BackupDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackupDatabaseService],
    }).compile();

    service = module.get<BackupDatabaseService>(BackupDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
