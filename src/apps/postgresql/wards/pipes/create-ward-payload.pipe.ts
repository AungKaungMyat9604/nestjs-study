import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { AjvService } from 'src/services/gloabal/ajv/ajv.service';
import { ajvCreateWardPayloadSchema } from '../schema/create-ward-payload.schema';

@Injectable()
export class CreateWardPayloadPipe implements PipeTransform {
  constructor(private ajvService: AjvService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const validator = this.ajvService.buildValidator(
      ajvCreateWardPayloadSchema,
    );

    if (validator(value)) {
      return value;
    } else {
      throw new NotAcceptableException(validator.errors);
    }
  }
}