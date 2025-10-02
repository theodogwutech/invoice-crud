/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Utils } from 'src/common/utils';
import { InvoiceRepository } from 'src/repositories/invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(InvoiceRepository)
    private readonly invoiceRepository: InvoiceRepository,
    @Inject(Utils) private readonly utils: Utils,
  ) {}

  async generateInvoiceNumber(): Promise<string> {
    const count = await this.invoiceRepository.countDocuments({});
    const nextNumber = count + 1;

    const padded = String(nextNumber).padStart(5, '0');

    return `${padded}`;
  }

  async createInvoice({
    customer,
    due_date,
    amount,
    tax,
    discount,
    currency,
    invoice_number,
    additional_info,
    is_draft = false,
    items,
  }: {
    customer: {
      name: string;
      email: string;
      phone_number: string;
    };
    due_date: Date;
    amount: number;
    is_draft?: boolean;
    tax: number;
    discount: number;
    currency: string;
    invoice_number: string;
    additional_info: string;
    items: {
      vehicle_model: string;
      vehicle_make: string;
      vehicle_color: string;
      vehicle_amount: number;
      vehicle_year: number;
      vehicle_image: string;
    }[];
  }) {
    const invoice = await this.invoiceRepository.create({
      customer,
      due_date,
      amount,
      tax,
      discount,
      status: !is_draft ? 'sent' : 'draft',
      currency,
      invoice_number,
      additional_info,
      items,
    });

    if (!invoice) {
      return {
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Failed to create invoice`,
      };
    }

    return {
      success: true,
      code: HttpStatus.CREATED,
      message: `Invoice created successfully`,
      data: invoice,
    };
  }

  async getAllInvoices({
    page = 1,
    perPage = 10,
    status,
    search,
  }: {
    page: number;
    perPage: number;
    status?: string;
    search?: string;
  }) {
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { 'customer.name': new RegExp(search, 'i') },
        { 'customer.email': new RegExp(search, 'i') },
        { invoice_number: new RegExp(search, 'i') },
        { invoice_id: new RegExp(search, 'i') },
      ];
    }
    const total = await this.invoiceRepository.countDocuments(query);

    const invoices = await this.invoiceRepository.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * perPage },
      { $limit: perPage },
    ]);

    const pagination = this.utils.repoPagination({
      total,
      page,
      perPage: perPage,
    });
    return {
      success: true,
      code: HttpStatus.OK,
      message: `Invoices fetched successfully`,
      data: {
        invoices,
        pagination,
      },
    };
  }

  async getInvoiceSummary() {
    const totalInvoices = await this.invoiceRepository.countDocuments({});
    const paidInvoices = await this.invoiceRepository.getAll({
      status: 'paid',
    });
    const draftInvoices = await this.invoiceRepository.getAll({
      status: 'draft',
    });
    const overdueInvoices = await this.invoiceRepository.getAll({
      status: 'overdue',
    });

    const outstandingInvoices = await this.invoiceRepository.getAll({
      status: 'sent',
    });

    const paidAmount = paidInvoices.reduce(
      (acc, invoice) => acc + (invoice.amount || 0),
      0,
    );
    const draftAmount = draftInvoices.reduce(
      (acc, invoice) => acc + (invoice.amount || 0),
      0,
    );
    const overdueAmount = overdueInvoices.reduce(
      (acc, invoice) => acc + (invoice.amount || 0),
      0,
    );
    const outstandingAmount = outstandingInvoices.reduce(
      (acc, invoice) => acc + (invoice.amount || 0),
      0,
    );

    return {
      success: true,
      code: HttpStatus.OK,
      message: `Invoice summary fetched successfully`,
      data: {
        totalInvoices,
        paidInvoices: paidInvoices.length,
        paidAmount,
        draftInvoices: draftInvoices.length,
        draftAmount,
        overdueInvoices: overdueInvoices.length,
        overdueAmount,
        outstandingInvoices: outstandingInvoices.length,
        outstandingAmount,
      },
    };
  }

  async deleteInvoice(invoice_id: string) {
    const invoice = await this.invoiceRepository.getOne({ invoice_id });
    if (!invoice) {
      return {
        success: false,
        code: HttpStatus.NOT_FOUND,
        message: `Invoice not found`,
      };
    }

    await this.invoiceRepository.delete({ invoice_id });

    return {
      success: true,
      code: HttpStatus.OK,
      message: `Invoice deleted successfully`,
    };
  }

  async editInvoice(
    invoice_id: string,
    updateData: {
      customer?: {
        name?: string;
        email?: string;
        phone_number?: string;
      };
      due_date?: Date;
      amount?: number;
      tax?: number;
      discount?: number;
      currency?: string;
      invoice_number?: string;
      additional_info?: string;
      items?: {
        vehicle_model?: string;
        vehicle_make?: string;
        vehicle_color?: string;
        vehicle_amount?: number;
        vehicle_image?: string;
      }[];
    },
  ) {
    const invoice = await this.invoiceRepository.getOne({ invoice_id });
    if (!invoice) {
      return {
        success: false,
        code: HttpStatus.NOT_FOUND,
        message: `Invoice not found`,
      };
    }

    const data = {
      customer: {
        name: updateData.customer?.name || invoice.customer?.name,
        email: updateData.customer?.email || invoice.customer?.email,
        phone_number:
          updateData.customer?.phone_number || invoice.customer?.phone_number,
      },
      due_date: updateData.due_date || invoice.due_date,
      amount: updateData.amount || invoice.amount,
      tax: updateData.tax || invoice.tax,
      discount: updateData.discount || invoice.discount,
      currency: updateData.currency || invoice.currency,
      invoice_number: updateData.invoice_number || invoice.invoice_number,
      additional_info: updateData.additional_info || invoice.additional_info,
      items: updateData.items || invoice.items,
    };

    const updatedInvoice = await this.invoiceRepository.atomicUpdate(
      { invoice_id },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
    );

    if (!updatedInvoice) {
      return {
        success: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Failed to update invoice`,
      };
    }

    return {
      success: true,
      code: HttpStatus.OK,
      message: `Invoice updated successfully`,
      data: updatedInvoice,
    };
  }
}
