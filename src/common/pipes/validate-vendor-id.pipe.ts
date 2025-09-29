import { Injectable } from '@nestjs/common';
import { ValidateObjectIdPipe } from './validate-object-id.pipe';

@Injectable()
export class ValidateVendorIdPipe extends ValidateObjectIdPipe {
  constructor() {
    super('Vendor ID');
  }
}
