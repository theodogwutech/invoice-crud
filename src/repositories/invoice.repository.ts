import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IInvoiceDocument } from 'src/interfaces/invoice.interface';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectModel('Invoice')
    private readonly invoiceModel: Model<IInvoiceDocument>,
  ) {}

  async create(
    record: {
      customer: {
        name: string;
        email: string;
        phone_number: string;
      };
      due_date: Date;
      amount: number;
      tax: number;
      discount: number;
      currency: string;
      status: string;
      invoice_number: string;
      additional_info: string;
      items: {
        vehicle_model: string;
        vehicle_make: string;
        vehicle_color: string;
        vehicle_amount: number;
        vehicle_image: string;
      }[];
    },
    session: any = null,
  ): Promise<IInvoiceDocument> {
    const [createdRecord] = await this.invoiceModel.create([record], {
      session,
    });
    return createdRecord;
  }

  async getOne(
    query: FilterQuery<IInvoiceDocument>,
  ): Promise<IInvoiceDocument> {
    return this.invoiceModel.findOne(query);
  }

  async getAll(
    query: FilterQuery<IInvoiceDocument>,
  ): Promise<IInvoiceDocument[]> {
    return this.invoiceModel.find(query);
  }

  async aggregate(query: any): Promise<IInvoiceDocument[]> {
    return this.invoiceModel.aggregate(query);
  }

  async countDocuments(query: FilterQuery<IInvoiceDocument>): Promise<number> {
    return this.invoiceModel.countDocuments(query);
  }

  async atomicUpdate(
    query: FilterQuery<IInvoiceDocument>,
    record: UpdateQuery<IInvoiceDocument>,
    session: any = null,
  ) {
    return this.invoiceModel.findOneAndUpdate(
      { ...query },
      { ...record },
      { new: true, session },
    );
  }

  async delete(query: FilterQuery<IInvoiceDocument>) {
    return this.invoiceModel.deleteOne(query);
  }
}
