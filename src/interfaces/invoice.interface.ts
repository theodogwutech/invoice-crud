import { Document } from 'mongoose';

export interface IInvoiceItem {
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_color?: string;
  vehicle_amount?: number;
  vehicle_image?: string;
}

export interface IInvoiceCustomer {
  name?: string;
  email?: string;
  phone_number?: string;
}

export interface IInvoice {
  invoice_id?: string;
  customer?: IInvoiceCustomer;
  due_date?: Date;
  amount?: number;
  tax?: number;
  discount?: number;
  currency?: string;
  status?: string;
  invoice_number?: string;
  additional_info?: string;
  items?: IInvoiceItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInvoiceDocument extends Document, IInvoice {}
