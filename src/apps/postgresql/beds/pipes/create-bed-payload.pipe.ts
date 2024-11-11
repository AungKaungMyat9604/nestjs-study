import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { AjvService } from 'src/services/gloabal/ajv/ajv.service';
import { ajvCreateBedPayloadSchema } from '../schema/create-bed-payload.schema';

@Injectable()
export class CreateBedPayloadPipe implements PipeTransform {
  constructor(private ajvService: AjvService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const validator = this.ajvService.buildValidator(ajvCreateBedPayloadSchema);

    if (validator(value)) {
      return value;
    } else {
      throw new NotAcceptableException(validator.errors);
    }
  }
}
