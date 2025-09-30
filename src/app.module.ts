import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './common/filters/http-exception.filter';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),

    DatabaseModule,
    InvoiceModule,
    VehicleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
