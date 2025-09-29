import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value, { abortEarly: false });

    if (error) {
      throw new HttpException(
        {
          success: false,
          code: HttpStatus.BAD_REQUEST,
          message: error.details.map((detail) => detail.message).join(', '),
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
