import { Test, TestingModule } from '@nestjs/testing';
import { CryptoJsService } from './crypto-js.service';

describe('AjvService', () => {
  let service: CryptoJsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoJsService],
    }).compile();

    service = module.get<CryptoJsService>(CryptoJsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
