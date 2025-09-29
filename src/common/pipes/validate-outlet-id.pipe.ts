import { Injectable } from '@nestjs/common';
import { ValidateObjectIdPipe } from './validate-object-id.pipe';

@Injectable()
export class ValidateOutletIdPipe extends ValidateObjectIdPipe {
  constructor() {
    super('Outlet ID');
  }
}
