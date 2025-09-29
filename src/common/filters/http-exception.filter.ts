import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else {
      if (exception.message != null && exception.message.length > 0) {
        message = exception.message;
      }
    }

    const timestamp = Date.now();
    const dateObj = new Date(timestamp);
    const fullYear = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const fullMonth =
      month < 10 ? String(month).padStart(2, '0') : String(month);
    const day = dateObj.getDate();
    const fullDay = day < 10 ? String(day).padStart(2, '0') : String(day);
    const hours = dateObj.getHours();
    const fullHours =
      hours < 10 ? String(hours).padStart(2, '0') : String(hours);
    const minutes = dateObj.getMinutes();
    const fullMinutes =
      minutes < 10 ? String(minutes).padStart(2, '0') : String(minutes);

    const yearMonthDateHourMinute = `${fullYear}-${fullMonth}-${fullDay} ${fullHours}:${fullMinutes}`;

    console.error(yearMonthDateHourMinute);

    response.status(status).json({
      success: false,
      code: status,
      message: message,
    });
  }
}
