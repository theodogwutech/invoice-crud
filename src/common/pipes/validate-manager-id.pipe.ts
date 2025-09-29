import { Injectable } from '@nestjs/common';
import { ValidateObjectIdPipe } from './validate-object-id.pipe';

@Injectable()
export class ValidateManagerIdPipe extends ValidateObjectIdPipe {
  constructor() {
    super('Manager ID');
  }
}
