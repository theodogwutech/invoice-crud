import { IOutletDocument } from 'src/interfaces/outlet.interface';
import { IVendorDocument } from 'src/interfaces/invoice.interface';

declare global {
  namespace Express {
    interface Request {
      // vendor?: IVendorDocument;
      // outlet?: IOutletDocument;
    }
  }
}
