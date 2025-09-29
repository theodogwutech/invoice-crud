import { Response } from 'express';

export interface ApiResponseType {
  res: Response;
  success: boolean;
  code: number;
  message?: string | string[];
  data?: any;
}
