import { Injectable } from '@nestjs/common';
import { ValidateObjectIdPipe } from './validate-object-id.pipe';

@Injectable()
export class ValidateProductIdPipe extends ValidateObjectIdPipe {
  constructor() {
    super('Product ID');
  }
}
