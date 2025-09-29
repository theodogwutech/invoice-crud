import { IOutletDocument } from 'src/interfaces/outlet.interface';
import { IVendorDocument } from 'src/interfaces/invoice.interface';

declare global {
  namespace Express {
    interface Request {
      vendor?: IVendorDocument;
      outlet?: IOutletDocument;
    }
  }
}

export type OrderType =
  | 'kalenda_food'
  | 'kalenda_groceries'
  | 'kalenda_courier'
  | 'kalenda_pharmacy'
  | 'kalenda_gas'
  | 'kalenda_laundry';

export type DeliveryStatus =
  | 'accepted'
  | 'preparing'
  | 'compiling'
  | 'pickup_scheduled'
  | 'rider_en_route_pickup'
  | 'rider_picked'
  | 'laundry_in_progress'
  | 'ready_for_delivery'
  | 'rider_en_route_delivery'
  | 'delivered';
