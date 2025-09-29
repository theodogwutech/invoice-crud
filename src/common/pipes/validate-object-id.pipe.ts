import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string> {
  constructor(private readonly entityName: string = 'ID') {}

  transform(value: string): string {
    if (!value) {
      throw new BadRequestException(`${this.entityName} is required`);
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      throw new BadRequestException(`${this.entityName} cannot be empty`);
    }

    if (!Types.ObjectId.isValid(trimmedValue)) {
      throw new BadRequestException(
        `Invalid ${this.entityName.toLowerCase()} format`,
      );
    }

    return trimmedValue;
  }
}
