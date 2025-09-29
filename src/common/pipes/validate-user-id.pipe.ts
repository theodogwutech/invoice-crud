import { Injectable } from '@nestjs/common';
import { ValidateObjectIdPipe } from './validate-object-id.pipe';

@Injectable()
export class ValidateUserIdPipe extends ValidateObjectIdPipe {
  constructor() {
    super('User ID');
  }
}
