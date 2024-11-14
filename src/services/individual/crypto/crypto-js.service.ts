import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class CryptoJsService {
  randomHexString(length: number) {
    return randomBytes(length).toString('hex');
  }
}
