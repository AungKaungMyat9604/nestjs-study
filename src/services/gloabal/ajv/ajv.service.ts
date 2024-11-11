import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

@Injectable()
export class AjvService {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    this.ajv.addFormat(
      'uuid',
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    ajvErrors(this.ajv);
  }

  getAjv() {
    return this.ajv;
  }

  buildValidator(schema: object) {
    return this.ajv.compile(schema);
  }
}
