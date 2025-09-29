import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDate,
  ValidateNested,
  IsArray,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;
}

class CreateInvoiceItemDto {
  @IsString()
  @IsNotEmpty()
  vehicle_model: string;

  @IsString()
  @IsNotEmpty()
  vehicle_make: string;

  @IsString()
  @IsNotEmpty()
  vehicle_color: string;

  @IsNumber()
  vehicle_amount: number;

  @IsString()
  vehicle_image: string;
}

export class CreateInvoiceDto {
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @IsDate()
  @Type(() => Date)
  due_date: Date;

  @IsNumber()
  amount: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  discount: number;

  @IsString()
  currency: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  invoice_number: string;

  @IsString()
  @IsOptional()
  additional_info?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];
}
