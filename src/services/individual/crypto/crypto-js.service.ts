import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class CryptoJsService {
  randomHexString(length: number) {
    return randomBytes(length).toString('hex');
  }

  hexString(string: string) {
    return createHash('sha256').update(string).digest('hex');
  }
}
