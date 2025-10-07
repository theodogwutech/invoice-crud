import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { Utils } from 'src/common/utils';
import { CreateInvoiceDto } from 'src/dto/invoice';
import { INVOICE_ROUTES } from 'src/routes/invoice.route';
import { InvoiceService } from 'src/services/invoice.service';
import { createInvoiceValidationSchema } from 'src/validations/invoice.validation';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly utils: Utils,
  ) {}

  @Get(INVOICE_ROUTES.GET_INVOICES)
  async getInvoices(@Req() req: Request, @Res() res: Response) {
    const { page = 1, perPage = 10, status, search } = req.query;

    const result = await this.invoiceService.getAllInvoices({
      page: Number(page),
      perPage: Number(perPage),
      status: status as string,
      search: search as string,
    });

    return this.utils.apiResponse({
      res,
      success: result.success,
      code: result.code,
      message: result.message,
      data: result.data,
    });
  }

  @Get(INVOICE_ROUTES.GET_INVOICE)
  async getInvoice(@Req() req: Request, @Res() res: Response) {
    if (!req.params.invoice_id) {
      return this.utils.apiResponse({
        res,
        success: false,
        code: HttpStatus.BAD_REQUEST,
        message: 'Invoice id is required',
      });
    }
    const result = await this.invoiceService.getInvoice({
      invoice_id: req.params.invoice_id,
    });

    return this.utils.apiResponse({
      res,
      success: result.success,
      code: result.code,
      message: result.message,
      data: result.data,
    });
  }

  @Post(INVOICE_ROUTES.CREATE_INVOICE)
  async createInvoice(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new JoiValidationPipe(createInvoiceValidationSchema))
    body: CreateInvoiceDto,
  ) {
    const {
      customer,
      due_date,
      amount,
      tax,
      discount,
      currency,
      is_draft,
      invoice_number,
      additional_info,
      items,
    } = body;

    const result = await this.invoiceService.createInvoice({
      customer,
      due_date,
      amount,
      tax,
      discount,
      currency,
      is_draft: Boolean(is_draft),
      invoice_number,
      additional_info,
      items,
    });

    return this.utils.apiResponse({
      res,
      success: result.success,
      code: result.code,
      message: result.message,
      data: result.data,
    });
  }

  @Get(INVOICE_ROUTES.INVOICE_NUMBER)
  async getInvoiceNumber(@Res() res: Response) {
    const result = await this.invoiceService.generateInvoiceNumber();

    return this.utils.apiResponse({
      res,
      success: true,
      code: HttpStatus.OK,
      message: 'Invoice number generated successfully',
      data: result,
    });
  }

  @Get(INVOICE_ROUTES.SUMMARY)
  async getInvoiceSummary(@Res() res: Response) {
    const result = await this.invoiceService.getInvoiceSummary();

    return this.utils.apiResponse({
      res,
      success: true,
      code: HttpStatus.OK,
      message: 'Invoice summary fetched successfully',
      data: result.data,
    });
  }

  @Delete(INVOICE_ROUTES.DELETE)
  async deletesInvoice(
    @Res() res: Response,
    @Param('invoice_id') invoice_id: string,
  ) {
    if (!invoice_id) {
      return this.utils.apiResponse({
        res,
        success: false,
        code: HttpStatus.BAD_REQUEST,
        message: 'Invoice id is required',
      });
    }
    const result = await this.invoiceService.deleteInvoice(invoice_id);

    return this.utils.apiResponse({
      res,
      success: result.success,
      code: result.code,
      message: result.message,
      data: result,
    });
  }

  @Put(INVOICE_ROUTES.UPDATE)
  async updateInvoice(
    @Req() req: Request,
    @Res() res: Response,

    @Body(new JoiValidationPipe(createInvoiceValidationSchema))
    body: CreateInvoiceDto,
  ) {
    if (!req.params.invoice_id) {
      return this.utils.apiResponse({
        res,
        success: false,
        code: HttpStatus.BAD_REQUEST,
        message: 'Invoice id is required',
      });
    }

    const {
      customer,
      due_date,
      amount,
      tax,
      discount,
      currency,
      invoice_number,
      additional_info,
      items,
    } = body;

    const result = await this.invoiceService.editInvoice(
      req.params.invoice_id,
      {
        customer,
        due_date,
        amount,
        tax,
        discount,
        currency,
        invoice_number,
        additional_info,
        items,
      },
    );

    return this.utils.apiResponse({
      res,
      success: result.success,
      code: result.code,
      message: result.message,
      data: result.data,
    });
  }
}
