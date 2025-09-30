import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InvoiceSchema } from 'src/models/invoice.model';
import { InvoiceController } from 'src/controllers/invoice.controller';
import { InvoiceRepository } from 'src/repositories/invoice.repository';
import { InvoiceService } from 'src/services/invoice.service';
import { Utils } from 'src/common/utils';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceRepository, InvoiceService, Utils, AppConfig],
  exports: [MongooseModule, InvoiceRepository, InvoiceService],
})
export class InvoiceModule {}
